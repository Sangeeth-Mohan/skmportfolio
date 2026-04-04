# Sangeeth Kumar Mohan — Portfolio

World-class personal portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## Stack
- **Framework:** Next.js 14 (App Router, static export)
- **Styling:** Tailwind CSS + custom CSS animations
- **Animations:** Framer Motion (scroll reveals, letter stagger, counters, typewriter)
- **Fonts:** Inter (via next/font)
- **Deployment:** AWS Amplify (or Vercel for fastest MVP)

---

## Quick Start

```bash
cd portfolio
npm install
npm run dev
# → http://localhost:3000
```

## Build for Production

```bash
npm run build
# Outputs static files to /out folder (ready for S3/Amplify)
```

---

## Before You Launch — Checklist

### 1. Wire up Cal.com (5 minutes)
1. Sign up at [cal.com](https://cal.com) (free)
2. Create a "30-min intro call" event
3. Copy your booking URL (e.g. `https://cal.com/sangeeth/30min`)
4. Open `lib/data.ts` and replace:
   ```ts
   calcomUrl: 'https://cal.com/YOUR_USERNAME',
   ```
5. Optionally embed inline — see the comment in `components/Contact.tsx`

### 2. Wire up the Contact Form (choose one)

**Option A — EmailJS (zero backend, recommended for MVP):**
```bash
npm install @emailjs/browser
```
Then in `components/Contact.tsx`, replace the `await new Promise(...)` line with:
```ts
import emailjs from '@emailjs/browser'
await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
```
Sign up at [emailjs.com](https://emailjs.com) — free tier = 200 emails/month.

**Option B — AWS SES (Phase 2):**
Create `app/api/contact/route.ts` using `@aws-sdk/client-ses`.

### 3. Update your LinkedIn URL
Already set in `lib/data.ts` → `personalInfo.linkedin`.

### 4. Add your photo (optional)
Drop `public/photo.jpg` and add an `<Image>` to the About section.

---

## Deploy to AWS Amplify

1. Push this repo to GitHub/GitLab/CodeCommit
2. Go to **AWS Amplify Console** → "New App" → "Host web app"
3. Connect your repository
4. Amplify auto-detects Next.js — confirm build settings:
   - Build command: `npm run build`
   - Output directory: `out`
5. Click Deploy → live in ~3 minutes
6. Connect your custom domain in Amplify settings

**Amplify build config** (amplify.yml — auto-generated, but if needed):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: out
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

---

## Phase 2 Enhancements (post-Sunday)

| Feature | AWS Service | Effort |
|---------|------------|--------|
| Contact form email | SES + Lambda | 2 hrs |
| CMS for projects | DynamoDB + API Gateway | 4 hrs |
| Analytics | CloudWatch + Amplify Analytics | 1 hr |
| Custom domain | Route 53 | 30 min |
| Resume download | S3 pre-signed URL | 1 hr |

---

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css      ← all CSS variables, utilities, animations
│   ├── layout.tsx       ← metadata, fonts, root layout
│   └── page.tsx         ← composes all sections
├── components/
│   ├── Navigation.tsx   ← glass sticky nav, mobile drawer
│   ├── Hero.tsx         ← cinematic landing, letter reveal, typewriter
│   ├── About.tsx        ← animated counters, bio, education
│   ├── Experience.tsx   ← expandable timeline, 7 companies
│   ├── Skills.tsx       ← tabbed skill grid with proficiency bars
│   ├── Contact.tsx      ← form + Cal.com + social links
│   └── Footer.tsx       ← minimal footer with back-to-top
└── lib/
    ├── data.ts          ← ALL content lives here — easy to update
    └── utils.ts         ← cn() helper
```

**To update content:** only ever touch `lib/data.ts` — everything else pulls from it automatically.
