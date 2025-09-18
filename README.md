 **CARENT** — Modern, responsive car rental React app with static JSON API (Vercel-ready)

---

## 🚗 Project overview

CARENT is a polished, mobile-first React application for browsing and renting cars. It features a clean, professional UI and includes:

- Search with suggestion dropdown
- Car listing with lazy-loading and skeletons
- Car detail pages (slug-based routing)
- Recommended cars and reviews UI
- Multi-step billing / checkout flow (Razorpay sample integration)
- Static `public/db.json` used as a read-only API for easy deployment (Vercel)

This project is ideal for demos, prototypes, or as a starting point for a production-ready rental platform.

---

## ✨ Highlights

- Modern React with lazy-loading (`React.lazy`, `Suspense`)
- Tailwind CSS for utility-first styling
- `@tanstack/react-query` for data fetching & caching
- Skeleton loaders & lazy-loaded images for a snappy UX
- Read-only `db.json` API for zero-backend deployment
- Sample payment integration with Razorpay (client-side demo)
- Responsive layout and accessible UI patterns

---

## 📁 Repo structure

/
├─ public/
│ ├─ db.json # static JSON "API" (read-only)
│ ├─ images/ # image assets used by db.json
│ └─ assets/ # logos, icons, etc.
├─ src/
│ ├─ Components/ # Reusable UI components (Navbar, Card, Listing...)
│ ├─ pages/ # Page components (Home, AllCars, CarDetail, Billing)
│ ├─ App.jsx
│ └─ main.jsx
├─ package.json
├─ README.md
└─ LICENSE

yaml
Copy code

---

## 🛠️ Tech stack

- React
- Tailwind CSS
- react-router-dom
- @tanstack/react-query
- react-loading-skeleton
- react-lazy-load-image-component
- Razorpay (demo)
- Static `db.json` in `/public`


<img width="1533" height="901" alt="image" src="https://github.com/user-attachments/assets/6bc10c06-1c63-4a04-8e5a-5992fa4452fa" /><img width="1392" height="853" alt="image" src="https://github.com/user-attachments/assets/49392d79-9964-4f90-a7c9-869d5a420dff" /><img width="1415" height="885" alt="image" src="https://github.com/user-attachments/assets/08e64e23-18bb-4389-8db3-37f5728f525d" />
<img width="1585" height="802" alt="image" src="https://github.com/user-attachments/assets/490e30e9-3db6-4798-be75-cbadefcf0267" />



