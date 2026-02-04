# QR Code Generator

A simple standalone app to generate QR codes for any website URL. Enter a URL in the input field and get a scannable QR code; you can download it as a PNG.

## Getting Started

From this folder:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. Enter a website URL in the input (e.g. `www.example.com` or `https://example.com`).
2. The QR code updates automatically.
3. Click **Download PNG** to save the image.

If the input is left empty, the default URL `https://www.claygroundflims.com` is used. URLs without `http://` or `https://` are prefixed with `https://` automatically.

## Tech

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- [qrcode](https://www.npmjs.com/package/qrcode) for generation

## Location

This app lives in its own folder next to your Clay Ground project:

- `.../Git-Repositories-local/qr-code-generator/` (this app)
- `.../Git-Repositories-local/Clay-Girls-typescript-Next.js/` (Clay Ground)
