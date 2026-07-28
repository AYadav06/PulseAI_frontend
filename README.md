# ⚡ PulseAI Frontend Application

[![Frontend Status](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://app.pulseai.amitdev.site)
[![Backend Status](https://img.shields.io/badge/Backend-AWS_EC2-orange?style=for-the-badge&logo=amazon-aws)](https://pulseai.amitdev.site)

This is the frontend single-page application (SPA) for **PulseAI**, built using **React 19**, **Vite 8**, **TypeScript**, **TailwindCSS v4**, and **Radix UI / Lucide Icons**.

- **Production App URL**: [https://app.pulseai.amitdev.site](https://app.pulseai.amitdev.site)
- **Backend API URL**: [https://pulseai.amitdev.site](https://pulseai.amitdev.site)

---

## 🌟 Features

- 💬 **Streaming AI Chat UI**: Server-Sent Events (SSE) streaming for real-time text rendering.
- 🎨 **Dark Theme Interface**: Custom styled modern dark UI with dynamic layouts and responsive sidebars.
- 💳 **Razorpay Checkout Modal**: In-app purchase flows for Starter, Pro, and Premium plan upgrades.
- 📜 **Markdown & Code Rendering**: Markdown formatting with code syntax highlighting and copy-to-clipboard functionality.
- 🚀 **Deployed on Vercel**: Automated continuous deployment on git commits with custom CNAME domain mapping (`app.pulseai.amitdev.site`).

---

## 📁 Repository Structure

```
PulseAi_frontend/
└── frontend/
    ├── src/
    │   ├── components/       # ChatHeader, ChatInput, SideBar, CreditsModal, MessageBubble, etc.
    │   ├── context/          # State management context
    │   ├── pages/            # Dashboard, SignIn, SignUp
    │   ├── App.tsx
    │   └── main.tsx
    ├── .env
    ├── index.html
    ├── vite.config.ts
    └── package.json
```

---

## 🔑 Environment Variables Setup

Create a `.env` file in `frontend/`:

```env
VITE_API_BASE=https://pulseai.amitdev.site/api/v1
VITE_RAZORPAY_KEY_ID=rzp_live_or_test_key_id
```

---

## ⚡ Local Development

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

Runs on `http://localhost:5173`.

---

## 🚀 Vercel Deployment

- **Deployment Platform**: Vercel
- **Custom Domain**: `app.pulseai.amitdev.site`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
