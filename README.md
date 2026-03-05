# QR Code Generator

Simple Next.js app to generate a QR code for any URL and download it as a PNG.

## Features

- Generate QR codes instantly from URL input
- Auto-normalize URLs (adds `https://` when missing)
- Optional custom filename for downloads
- Static export configured for GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Usage

1. Enter a URL (example: `www.example.com` or `https://example.com`)
2. The QR code updates automatically
3. Click **Download PNG**

If the input is empty, the app uses `https://www.claygroundflims.com`.

## Deploying to GitHub Pages

This project already includes:

- Next.js static export settings in `next.config.ts`
- GitHub Actions workflow at `.github/workflows/deploy.yml`

To deploy:

1. Push to `master`
2. In GitHub, go to **Settings > Pages**
3. Set **Source** to **GitHub Actions**
4. Check **Actions** tab for `Deploy to GitHub Pages` workflow success
5. Open: [https://sean-mongey.github.io/qr-code-generator/](https://sean-mongey.github.io/qr-code-generator/)

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- [`qrcode`](https://www.npmjs.com/package/qrcode)
