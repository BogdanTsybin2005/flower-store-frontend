# Flower Store Frontend (FSD)

Production-grade customer-facing storefront built with Next.js, React, and TypeScript following Feature-Sliced Design (FSD).

## Project structure (FSD)
```
src/
  app/            # Next.js App Router routes + app shell
  screens/        # routing-level UI
  widgets/        # page sections (navigation, layout)
  features/       # auth, cart, checkout, messages
  entities/       # domain entities (product, order, payment, user)
  shared/         # api, config, lib utilities, ui kit
```

## Environment variables
Create a `.env` file based on `.env.example`:
```
NEXT_PUBLIC_API_BASE_URL=https://flower-store-backend-kappa.vercel.app
NEXT_PUBLIC_API_TIMEOUT_MS=10000
```

## Local development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run start
```

## Security choices
- **Auth token storage**: tokens are kept in memory and persisted to `sessionStorage` to reduce exposure compared to `localStorage`. This keeps tokens across refreshes but clears them when the browser session ends.
- **Preferred approach**: if the backend supports httpOnly secure cookies, swap the auth flow to rely on cookies and remove client storage for tokens.
- **API client**: centralized `fetch` wrapper with timeout, consistent error handling, and typed request/response models.

## Deployment (Vercel)
- Add the environment variables from `.env.example` in Vercel project settings.
- Run `npm run build` in the build step and `npm run start` for the server.
