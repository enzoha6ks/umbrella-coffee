# Umbrella Coffee

Umbrella Coffee is a responsive cafe website and lightweight operations system built with Next.js, React, Prisma, Neon Postgres, Tailwind CSS, and Framer Motion.

The public site lets customers browse the cafe, select drinks or sweets, choose cup sizes, add optional sweet items, and send orders to staff. The staff and admin portals handle live orders, stock, expenses, and menu management.

## Features

- Responsive public cafe website
- Animated hero, about, gallery, and menu sections
- Mobile-first ordering flow
- Cart and checkout flow
- Counter payment options: KNET/NFC machine or cash
- Database-backed order recording
- Staff portal for incoming orders and stock
- Admin portal for sales, canceled orders, stock, expenses, and menu products
- Product image uploads for menu items
- Prisma models for orders, stock, expenses, menu items, gallery, and settings

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Framer Motion
- Prisma 7
- Neon Postgres

## Routes

- `/` - public customer website
- `/checkout` - cart checkout and payment method selection
- `/login` - staff/admin login
- `/staff` - staff dashboard
- `/admin` - admin dashboard

Demo credentials:

```txt
Admin: admin / admin
Staff: staff / staff
```

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

Do not commit real database credentials.

## Getting Started

Install dependencies:

```bash
npm install
```

Generate the Prisma client:

```bash
npx prisma generate
```

Sync the database schema:

```bash
npx prisma db push
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev      # start development server
npm run build    # build production app
npm run start    # start production server
npm run lint     # run ESLint
```

## Project Structure

```txt
prisma/schema.prisma            Prisma database models
public/images                   Static cafe and product images
src/app/page.tsx                Public homepage
src/app/checkout/page.tsx       Customer checkout
src/app/login/page.tsx          Staff/admin login
src/app/staff/page.tsx          Staff dashboard
src/app/admin/page.tsx          Admin dashboard
src/app/api                     Route handlers for orders, menu, stock, expenses, uploads
src/components/sections         Public site sections
src/lib/db.ts                   Prisma client setup
```

## Admin Workflow

Admins can:

- View sales, expenses, net totals, and recent orders
- See canceled orders
- Add stock items
- Add expenses
- Add menu products with price, category, description, and uploaded image

## Staff Workflow

Staff can:

- See incoming customer orders
- Open order details
- Mark orders as preparing, done, or canceled
- View and add stock items

## Notes

Uploaded menu images are stored as data URLs in the database so they work on serverless hosting where the filesystem is read-only.

Customer cart data is kept in browser local storage until checkout. Once the customer confirms KNET or cash payment, the order is recorded in the database for staff.
