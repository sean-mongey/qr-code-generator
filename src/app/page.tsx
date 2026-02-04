'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

const DEFAULT_URL = 'https://www.claygroundflims.com';
const QR_SIZE = 280;

function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function generateFilename(customName: string, url: string): string {
  if (customName.trim()) {
    return customName.trim();
  }
  // Generate from URL: remove protocol, replace special chars
  return `qr-${url.replace(/^https?:\/\//, '').replace(/[^a-z0-9.-]/gi, '-')}.png`;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [customFilename, setCustomFilename] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const valueToEncode = url.trim() ? normalizeUrl(url) : DEFAULT_URL;

  useEffect(() => {
    QRCode.toDataURL(valueToEncode, { width: QR_SIZE, margin: 2 })
      .then(setQrDataUrl)
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to generate QR code');
        setQrDataUrl(null);
      });
    setError(null);
  }, [valueToEncode]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = generateFilename(customFilename, valueToEncode);
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 font-sans">
      <main className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 text-center mb-2">
          QR Code Generator
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-center text-sm mb-8">
          Enter a website URL to generate a scannable QR code.
        </p>

        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Website URL
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="www.example.com or https://example.com"
          className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          aria-label="Website URL for QR code"
        />
        <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          Leave empty to use {DEFAULT_URL}
        </p>

        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 mt-6">
          Custom Filename (optional)
        </label>
        <input
          type="text"
          value={customFilename}
          onChange={(e) => setCustomFilename(e.target.value)}
          placeholder="my-qr-code.png"
          className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          aria-label="Custom filename for download"
        />
        <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          Leave empty to auto-generate from URL
        </p>

        <div className="mt-8 flex flex-col items-center">
          {error ? (
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          ) : qrDataUrl ? (
            <>
              <img
                src={qrDataUrl}
                alt={`QR code for ${valueToEncode}`}
                width={QR_SIZE}
                height={QR_SIZE}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white p-2"
              />
              <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400 text-center break-all max-w-[280px]">
                {valueToEncode}
              </p>
              <button
                type="button"
                onClick={handleDownload}
                className="mt-4 px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors"
              >
                Download PNG
              </button>
            </>
          ) : (
            <div
              className="w-[280px] h-[280px] rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-400"
              aria-hidden
            >
              Generating…
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
