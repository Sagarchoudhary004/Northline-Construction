# Northline Build — MERN Stack Website & Admin CMS

A responsive, animated MERN (MongoDB, Express.js, React, Node.js) business website and Content Management System for **Northline Build**, featuring Cuberto & Unseen Studio inspired motion design, Multer file upload validation, Cloudinary cloud storage integration, and a full-featured protected Admin Panel.

---

## Architecture & Design Patterns

### Backend (`server/src/`)
- **Layered Architecture**: `Routes -> Middlewares -> Controllers -> Services -> Repositories -> Models`.
- **Singleton Pattern**: `config/db.js` (`DatabaseConnection`) and `config/cloudinary.js` (`CloudinaryClient`) guarantee single shared instances.
- **Repository Pattern**: `repositories/baseRepository.js` and domain repositories (`adminRepository`, `contentRepository`, `projectRepository`, `enquiryRepository`, `mediaRepository`) isolate Mongoose queries from business rules.
- **Service Layer Pattern**: `services/*` encapsulate domain logic (auth, CMS merging, project slugging & reordering, enquiry filtering, dashboard aggregation).
- **Strategy Pattern**: `services/storageStrategy.js` (`StorageContext`) selects `CloudinaryStorageStrategy` (using `cloudinary.uploader.upload_stream` with Multer `memoryStorage`) when Cloudinary credentials are configured in `server/.env`, or `LocalDiskStorageStrategy` as a seamless development fallback.
- **Centralized Error & Response Envelope**: `utils/AppError.js`, `utils/asyncHandler.js`, `utils/apiResponse.js`, and `middlewares/errorMiddleware.js`.

### Frontend (`client/src/`)
- **Context + Service Layer**: `services/apiClient.js` + `AuthContext` + `SiteContext` + `CursorContext`.
- **Motion & Accessibility**:
  - Lenis smooth scroll (`hooks/useLenis.js`)
  - Custom magnetic cursor & magnetic pill buttons (`components/motion/CustomCursor.jsx`, `MagneticButton.jsx`)
  - Masked split-word heading reveals (`MaskedHeading.jsx`) & scroll-linked parallax (`ParallaxImage.jsx`)
  - Full `prefers-reduced-motion` support (`<MotionConfig reducedMotion="user">`).

---

## Project Structure

```text
├── package.json                  # Root orchestration scripts (dev, seed, build)
├── server/
│   ├── .env.example              # Environment template (MongoDB, JWT, Cloudinary, Admin)
│   ├── uploads/seed/             # Architectural photography assets
│   └── src/
│       ├── config/               # env.js, db.js (Singleton), cloudinary.js (Singleton)
│       ├── models/               # Admin, SiteContent, Project, Enquiry, Media
│       ├── repositories/         # BaseRepository + domain repositories
│       ├── services/             # Business logic + StorageStrategy (Cloudinary/Local)
│       ├── middlewares/          # authMiddleware, uploadMiddleware (Multer), validate, error
│       ├── controllers/          # HTTP request/response handlers
│       ├── routes/               # Express REST endpoints
│       ├── seed/                 # Idempotent database seeder
│       ├── app.js                # Express app setup
│       └── server.js             # Entry point
└── client/
    ├── vite.config.js            # Vite + Tailwind v4 + /api & /uploads proxy
    └── src/
        ├── services/             # Axios API client & domain modules
        ├── context/              # AuthContext, SiteContext, CursorContext
        ├── hooks/                # useDocumentMeta, useLenis
        ├── components/
        │   ├── common/           # BrandMark
        │   ├── layout/           # Navbar, Footer, PublicLayout
        │   ├── motion/           # CustomCursor, MagneticButton, MaskedHeading, ParallaxImage
        │   └── admin/            # Dashboard, Home CMS, About CMS, Projects, Enquiries, Contact, Media
        └── pages/                # HomePage, AboutPage, ContactPage, AdminLoginPage, AdminLayoutPage
```

---

## Setup & Installation

### 1. Prerequisites
- Node.js `>= 20`
- MongoDB running locally on `mongodb://127.0.0.1:27017` (or a MongoDB Atlas URI)
- A [Cloudinary](https://cloudinary.com/) account (for cloud image storage)

### 2. Configure Environment Variables
Edit `server/.env` (created from `server/.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/northline_build
JWT_SECRET=your_long_random_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=northline-build
```

### 3. Install Dependencies & Seed Database
```bash
npm install
npm run install:all
npm run seed
```

### 4. Run Development Servers
```bash
npm run dev
```
- **Public Website**: `http://localhost:5173`
- **Admin Login**: `http://localhost:5173/admin/login` (or click the **Admin** tab in the navbar)
- **API Health Check**: `http://localhost:5000/api/health`

---

## Default Admin Credentials
- **Email**: `admin@northlinebuild.com`
- **Password**: `Northline@2026!`

*(Defined in `server/.env` via `ADMIN_EMAIL` / `ADMIN_PASSWORD` — change before deploying to production.)*

---

## Admin Handover Walkthrough

1. **Log In**: Click **Admin** in the top navigation bar (or visit `/admin/login`) and sign in with your admin credentials.
2. **Edit Home or About Page Content**: Open **Home Content** or **About Content** in the left sidebar. Modify headlines, supporting text, capability/sector descriptions, or swap images via **Upload New Photo** (Multer → Cloudinary) or **Choose from Library**, then click **Save**. Changes reflect immediately on the public site.
3. **Manage Projects**: Open **Projects** to add new projects, edit metadata, reorder cards with Up/Down controls, toggle **Publish/Unpublish**, or delete entries.
4. **Manage Enquiries**: Open **Enquiries** to search, filter by status (`New`, `In Progress`, `Responded`, `Closed`), read full briefs, add internal admin notes, or remove records.
5. **Upload & Replace Media**: Open **Media Library** to upload new photos (JPEG/PNG/WebP/AVIF up to 5 MB), replace existing assets in-place, copy URLs, or delete unused media.

---

## Deploying to Vercel (Frontend + Backend)

This repository includes `vercel.json` and `api/index.js` to deploy both the React Vite frontend and the Express serverless API in a single Vercel project:

1. Push the repository to GitHub/GitLab/Bitbucket and import it into **Vercel** (Framework Preset: **Other**, Root Directory: `./`).
2. Add the following **Environment Variables** in Vercel Project Settings:
   - `NODE_ENV=production`
   - `MONGODB_URI` (MongoDB Atlas connection string with `0.0.0.0/0` whitelisted in Atlas Network Access)
   - `JWT_SECRET` (strong random secret)
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_FOLDER=northline-build` *(required for image uploads on Vercel)*
   - `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
3. Deploy — Vercel builds `client/dist`, serves `/uploads/seed/*` statically, and routes `/api/*` through `api/index.js` (keeping image uploads ≤ 4 MB to fit Vercel's 4.5 MB serverless payload limit).
