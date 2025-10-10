# iTwin Viewer in Next.js - Proof of Concept

This is a proof of concept demonstrating the [iTwin Viewer](https://github.com/iTwin/viewer) running in a Next.js App Router application.
You'll want to figure out asset copying using a webpack plugin/config in next.config.ts to avoid having to manually copy localization
files and other static assets (you'll notice that cursor icons are not working properly, for instance).

## Prerequisites

Before running this application, you need:

1. **Node.js+** and **pnpm** installed
2. **iTwin Platform Credentials** from [developer.bentley.com](https://developer.bentley.com/)
   - OIDC Client ID, Redirect URI, and Scopes
   - An iTwin ID 
   - An iModel ID

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Add an `.env.local` file at the root of the repo and fill in with required environment variables:

```env
# Authorization Client Settings
NEXT_PUBLIC_IMJS_AUTH_CLIENT_CLIENT_ID="your-client-id"
NEXT_PUBLIC_IMJS_AUTH_CLIENT_REDIRECT_URI="http://localhost:3000/signin-callback"
NEXT_PUBLIC_IMJS_AUTH_CLIENT_LOGOUT_URI="http://localhost:3000"
NEXT_PUBLIC_IMJS_AUTH_CLIENT_SCOPES="itwin-platform"

# iTwin and iModel IDs
NEXT_PUBLIC_IMJS_ITWIN_ID="your-itwin-id"
NEXT_PUBLIC_IMJS_IMODEL_ID="your-imodel-id"

# Optional: Bing Maps Key 
NEXT_PUBLIC_IMJS_BING_MAPS_KEY=""
```

### 3. Getting Your Credentials

#### OIDC Client Registration

1. Go to [developer.bentley.com](https://developer.bentley.com/)
2. Register a new application
3. Set the redirect URI to: `http://localhost:3000/signin-callback`
4. Ensure the `itwin-platform` scope is enabled
5. Copy your Client ID

#### iTwin and iModel IDs

- **iTwin ID**: Use the [iTwins API](https://developer.bentley.com/apis/itwins/operations/get-itwin/) to list your iTwins
- **iModel ID**: Use the [iModels API](https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-details/) to list iModels in your iTwin
- **Alternative**: Follow the [Quick Start Tutorial](https://developer.bentley.com/tutorials/web-application-quick-start/) to create a test iModel

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
viewer-next/
├── app/
│   ├── layout.tsx           # Root layout with iTwinUI styles
│   ├── page.tsx             # Home page with setup instructions
│   ├── viewer/
│   │   └── page.tsx         # Viewer page (client-side only)
│   └── signin-callback/
│       └── page.tsx         # OIDC callback handler
├── components/
│   ├── ViewerApp.tsx        # Main viewer component wrapper
│   └── UiProviders.tsx      # Tree widget and property grid providers
├── lib/
│   └── selectionStorage.ts  # Unified selection storage
├── .env.local               # Environment variables (git-ignored)
├── next.config.ts           # Next.js configuration with webpack customizations
└── package.json             # Dependencies
```

