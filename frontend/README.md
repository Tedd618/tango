# Tango — Frontend

Next.js 16 app powering the Tango recruiting platform UI.

## Pages

| Route | Description |
|---|---|
| `/` | Landing / redirect |
| `/discover` | Swipe through candidate & recruiter profiles |
| `/matches` | View matches and chat with them |
| `/profile` | View your own profile |
| `/profile/edit` | Edit your profile, photos, and prompts |
| `/onboarding` | Role selection for new users (first login only) |

## Key Components

- **`ProfileView`** — Hinge-style profile card display, conditionally showing fields by role (applicant vs recruiter)
- **`ProfileEditForm`** — Role-aware form for editing vitals, uploading photos, and managing written prompts
- **`Header`** — Sticky top nav with Auth0 user avatar and dropdown

## Environment Setup

Create `frontend/.env.local`:

```env
AUTH0_SECRET=<a long random string>
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://<your-auth0-domain>
AUTH0_CLIENT_ID=<your-auth0-client-id>
AUTH0_CLIENT_SECRET=<your-auth0-client-secret>
```

Generate `AUTH0_SECRET` with:
```bash
openssl rand -hex 32
```

## Running

```bash
npm install
npm run dev
```

App available at [http://localhost:3000](http://localhost:3000)

## Auth0 Callback URLs

Add these in your Auth0 Application settings:

- **Allowed Callback URLs**: `http://localhost:3000/auth/callback`
- **Allowed Logout URLs**: `http://localhost:3000`
