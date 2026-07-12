# DevFolio — Full Stack Developer Portfolio Platform

A premium, fully dynamic personal brand platform built with Next.js 15, TypeScript, Prisma, and PostgreSQL.

## Features

- **Portfolio** — Projects, skills, experience timeline
- **Digital Marketplace** — Sell software products with pricing & demos  
- **Blog** — Full CMS with categories, tags, rich text
- **Freelancing Platform** — Contact forms, project request forms
- **Admin Panel** — Complete CMS for all content
- **CRM** — Messages, requests, orders management
- **SEO** — Per-page metadata, sitemap, robots.txt
- **Dark/Light Mode** — System preference + manual toggle
- **Animations** — Framer Motion throughout

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: NextAuth.js v5
- **Storage**: Cloudinary
- **Email**: Nodemailer
- **Animations**: Framer Motion

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Fill in your `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/devfolio"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your@email.com"
SMTP_PASS="your-app-password"
SMTP_FROM="Your Name <your@email.com>"
ADMIN_EMAIL="admin@yourdomain.com"
```

### 3. Set Up Database

```bash
# Create and run migrations
npx prisma migrate dev --name init

# Seed with demo data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Default credentials:**
- Email: `gautambinod629@gmail.com`
- Password: `admin123`

> ⚠️ Change the admin password immediately in production!

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public pages
│   ├── (admin)/admin/     # Admin panel (protected)
│   └── api/               # API routes
├── components/
│   ├── common/            # Navbar, Footer, ThemeToggle
│   ├── sections/          # Home page sections
│   └── admin/             # Admin sidebar, header
├── features/              # Feature-specific components
├── actions/               # Next.js Server Actions
├── lib/                   # Prisma, auth, cloudinary, email
├── utils/                 # Helper functions
└── prisma/
    ├── schema.prisma      # Database schema
    └── seed.ts            # Demo data
```

## Admin Panel Modules

| Module | Path |
|--------|------|
| Dashboard | `/admin/dashboard` |
| Hero Section | `/admin/hero` |
| About | `/admin/about` |
| Experience | `/admin/experience` |
| Skills | `/admin/skills` |
| Services | `/admin/services` |
| Projects | `/admin/projects` |
| Products | `/admin/products` |
| In Development | `/admin/working-products` |
| Blog Posts | `/admin/blogs` |
| Testimonials | `/admin/testimonials` |
| Case Studies | `/admin/case-studies` |
| Messages | `/admin/messages` |
| Requests | `/admin/requests` |
| Orders | `/admin/orders` |
| Media Library | `/admin/media` |
| SEO Settings | `/admin/seo` |
| Site Settings | `/admin/settings` |

## Deployment (Vercel)

### 1. Database

Provision a PostgreSQL database on [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app).

### 2. Cloudinary

Create a free account at [cloudinary.com](https://cloudinary.com).

### 3. Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Run migrations on production DB
npx prisma migrate deploy
```

### 4. Checklist

- [ ] PostgreSQL database provisioned
- [ ] Prisma migrations run (`prisma migrate deploy`)
- [ ] Seed data loaded (`npm run db:seed`)  
- [ ] Cloudinary configured
- [ ] SMTP credentials set
- [ ] `NEXTAUTH_SECRET` generated
- [ ] All env vars set in Vercel
- [ ] Custom domain configured
- [ ] Change default admin password

## Adding Your Content

1. Log in to admin at `/admin/login`
2. Go to **Hero Section** → update your name, bio, profile photo
3. Add your **Experience** entries
4. Upload your **Skills** with categories
5. Add your **Projects** with images and links
6. Create **Products** if selling digital goods
7. Write **Blog** posts
8. Configure **SEO** per page
9. Update **Settings** with your contact info

## Customization

### Colors
Edit `src/app/globals.css` — change CSS variables for `--primary` to match your brand.

### Fonts
Edit `src/app/layout.tsx` — swap `Inter` and `JetBrains_Mono` for other Google Fonts.

### Navigation
Edit `src/components/common/Navbar.tsx` — add/remove nav links.

## License

MIT — use freely for personal and commercial projects.
