# 🚀 Parts Plumbing – Headless E-Commerce for Plumbing Supplies

A modern, high‑performance e‑commerce platform for plumbing shops. Built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS**, and a headless **WordPress + WooCommerce + GraphQL** backend.

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![GraphQL](https://img.shields.io/badge/GraphQL-WPGraphQL-E10098?logo=graphql)](https://graphql.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#overview)
- [✨ Features](#-features)
- [🖼️ Screenshots](#️-screenshots)
- [⚙️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [🚀 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📬 Contact](#-contact)

---

## Overview

**Parts Plumbing** is a fully functional e‑commerce solution designed for plumbing businesses. It leverages the power of headless WordPress for content management while delivering a lightning‑fast, interactive frontend with Next.js.

### Key Highlights

- **Dynamic Product Catalog** – Real-time filtering by category, brand, and price
- **Smart Search** – Debounced search with live suggestions
- **Product Variations** – Support for variable products with size, color, and grade options
- **WhatsApp Integration** – Pre-filled WhatsApp messages for inquiries
- **AI Chat Widget** – Ready for OpenAI integration
- **Mobile-First Design** – Responsive and accessible across all devices

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Product Catalog** | Bento-style grid layout with product cards showing images, prices, and categories |
| **Search Overlay** | Full-screen overlay with live search suggestions (debounced) |
| **Filtering System** | Sidebar with category, brand, and price filters – updates URL and results client-side |
| **Product Detail Page** | Variation selector, WhatsApp pre-filled messages, read-more toggle |
| **AI Chat Widget** | Floating button with chat panel (full-screen on mobile) – placeholder AI response, ready for OpenAI integration |
| **Responsive Design** | Mobile-first approach with smooth animations |
| **Headless CMS** | WordPress backend with WooCommerce, exposed via WPGraphQL |
| **Performance** | Client-side caching (24h), debounced search, ISR for dynamic pages |

---

## 🖼️ Screenshots

| Home Page | Product Listing | Product Detail |
|-----------|-----------------|----------------|
| ![Home](https://via.placeholder.com/300x200?text=Home+Page) | ![Products](https://via.placeholder.com/300x200?text=Product+Listing) | ![Product](https://via.placeholder.com/300x200?text=Product+Detail) |

> *Replace placeholder images with actual screenshots of your project.*

---

## ⚙️ Tech Stack

- **Frontend Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React hooks, local storage
- **GraphQL Client**: Custom fetch with graphql-request
- **Backend CMS**: [WordPress](https://wordpress.org/) + [WooCommerce](https://woocommerce.com/) + [WPGraphQL](https://www.wpgraphql.com/)
- **Deployment**: [Vercel](https://vercel.com/) (recommended)

---

## 📦 Installation

### Prerequisites

- Node.js 20.9 or later
- npm, yarn, or pnpm
- A WordPress instance with WooCommerce and WPGraphQL installed

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/hamzakhan-std25/Parts-Plumbing.git
   cd Parts-Plumbing
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT=https://your-wordpress-site.com/graphql
   NEXT_PUBLIC_WHATSAPP_NUMBER=923001234567
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key   # optional
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT` | Your WordPress GraphQL endpoint | ✅ |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number for contact buttons (format: 923001234567) | ✅ |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key for contact page map | ❌ |

### Adding Products

Products are managed in the WordPress backend via WooCommerce. The frontend fetches them using GraphQL queries defined in `lib/queries.js`. New products will appear on the site within the cache lifetime (24 hours by default).

---

## 🚀 Usage

### Building for Production

```bash
npm run build
npm start
```

### Development Mode

```bash
npm run dev
```

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── categories/        # Category pages
│   ├── contact/           # Contact page
│   ├── home/              # Home page
│   ├── privacy-policy/    # Privacy policy page
│   ├── products/          # Product listing & detail pages
│   └── terms-conditions/  # Terms & conditions page
├── components/            # React components
│   ├── chat/              # AI chat widget
│   ├── contact/           # Contact components
│   ├── filters/           # Product filtering components
│   ├── layout/            # Header, Footer, Container
│   ├── product/           # Product-related components
│   ├── search/            # Search overlay
│   └── ui/                # Reusable UI components
├── constants/             # Configuration & routes
├── hooks/                 # Custom React hooks
├── lib/                   # GraphQL queries & utilities
├── services/              # Business logic services
├── styles/                # Global styles
└── utils/                 # Utility functions
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## 📬 Contact

- **WhatsApp**: +92 311 8688410
- **GitHub**: [@hamzakhan-std25](https://github.com/hamzakhan-std25)

---

<p align="center">Made with ❤️ for the plumbing community</p>
