# Owner's Brief

Owner's Brief is an educational daily stock-analysis product built around one principle:
own companies, do not trade tickers.

The v1 app includes:

- A polished public marketing page.
- Email magic-code auth through InstantDB.
- A logged-in dashboard.
- A dated sample Nvidia owner brief.
- Clickable brief sections with deeper drilldown pages.
- Watchlist, portfolio tracker, and saved brief actions.
- InstantDB schema, permissions, and a seed script for the sample content.

Educational and informational only. Not investment advice.

## Local Development

```bash
npm install
cp .env.example .env
npm run dev
```

The app runs in demo mode until `VITE_INSTANT_APP_ID` is set. Demo mode lets you preview the signed-in experience without sending a magic code.

## InstantDB Setup

Create or connect an Instant app:

```bash
npx instant-cli@latest init
```

Then set:

```bash
VITE_INSTANT_APP_ID=<your app id>
INSTANT_APP_ID=<your app id>
INSTANT_APP_ADMIN_TOKEN=<your admin token>
```

Push schema and permissions:

```bash
npx instant-cli@latest push schema
npx instant-cli@latest push perms
```

Seed the sample Nvidia brief:

```bash
npm run db:seed
```

## Deployment

```bash
npm run build
npx vercel --prod
```

Set `VITE_INSTANT_APP_ID` in Vercel project environment variables before production verification.
