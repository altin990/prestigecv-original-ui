# PrestigeCV — Firebase + Stripe Setup Guide

## 1. Install dependencies

```bash
npm install
```

---

## 2. Firebase Setup

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project (e.g. `prestige-cv`)
3. Enable **Authentication** → Sign-in methods → enable **Email/Password** and **Google**
4. Enable **Firestore Database** → Start in production mode
5. Go to **Project Settings** → Your apps → Add a Web App → copy the config values

Paste your Firebase config into a `.env` file (copy `.env.example` as a starting point):

```bash
cp .env.example .env
# then fill in your values
```

### Firestore Security Rules

In Firebase Console → Firestore → Rules, paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 3. Stripe Setup

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Create two products:
   - **PrestigeCV Pro** → Recurring → $9/month → copy the Price ID → `VITE_STRIPE_PRO_PRICE_ID`
   - **PrestigeCV Lifetime** → One-time → $49 → copy the Price ID → `VITE_STRIPE_LIFETIME_PRICE_ID`
3. Copy your **Publishable Key** → `VITE_STRIPE_PUBLISHABLE_KEY`
4. Copy your **Secret Key** (used in Firebase Functions, not in .env)

---

## 4. Deploy Firebase Functions

```bash
npm install -g firebase-tools
firebase login
firebase init functions   # choose existing project, JavaScript
```

Set your secret environment variables (these stay server-side, never in .env):

```bash
firebase functions:config:set \
  stripe.secret="sk_live_YOUR_SECRET_KEY" \
  stripe.webhook_secret="whsec_YOUR_WEBHOOK_SECRET" \
  client.url="https://yourdomain.com"
```

Deploy:

```bash
npm run deploy:functions
```

After deploying, copy the function URL shown in the terminal and set:
```
VITE_FIREBASE_FUNCTIONS_URL=https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net
```

---

## 5. Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks → Add endpoint
2. URL: `https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/stripeWebhook`
3. Events to listen for: `checkout.session.completed`, `invoice.payment_succeeded`
4. Copy the **Signing secret** → use it in step 4 as `stripe.webhook_secret`

---

## 6. Run locally

```bash
npm run dev
```

---

## Files added/changed

| File | What it does |
|------|-------------|
| `src/lib/firebase.ts` | Firebase app init |
| `src/lib/stripe.ts` | Stripe checkout helper + plan config |
| `src/contexts/AuthContext.tsx` | Firebase auth (replaces Supabase) |
| `src/pages/Auth.tsx` | Sign in / Sign up / Reset password UI |
| `src/pages/Pricing.tsx` | Pricing page with Stripe checkout |
| `functions/index.js` | Firebase Cloud Functions (Stripe webhook) |
| `.env.example` | Template for your environment variables |
