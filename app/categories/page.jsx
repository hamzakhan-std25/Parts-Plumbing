import Link from "next/link";
import Footer from "@/components/layout/Footer";
import {
  Pipette,
  Wrench,
  Gauge,
  ShowerHead,
  Layers,
  Flame,
  Filter,
  Droplets,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";

// ─── Static Category Data ────────────────────────────────────────────────────

const CATEGORIES = [
  {
    name: "Pipes",
    slug: "pipes",
    icon: Pipette,
    color: "from-blue-600/30 to-blue-800/10",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/15",
    description:
      "Complete range of PPR, PVC, CPVC and GI pipes for residential, commercial and industrial plumbing systems.",
    productCount: 48,
    subcategories: ["PPR Pipes", "PVC Pipes", "CPVC Pipes", "GI Pipes", "HDPE Pipes"],
  },
  {
    name: "Fittings",
    slug: "fittings",
    icon: Wrench,
    color: "from-purple-600/30 to-purple-800/10",
    border: "border-purple-500/30",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/15",
    description:
      "Elbows, tees, reducers, couplings and unions in PPR, PVC and brass for leak-proof connections.",
    productCount: 72,
    subcategories: ["Elbows", "Tees", "Couplings", "Reducers", "End Caps", "Unions"],
  },
  {
    name: "Valves",
    slug: "valves",
    icon: Gauge,
    color: "from-orange-600/30 to-orange-800/10",
    border: "border-orange-500/30",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/15",
    description:
      "Ball valves, gate valves, check valves and pressure-reducing valves for precise flow control.",
    productCount: 35,
    subcategories: ["Ball Valves", "Gate Valves", "Check Valves", "PRV", "Float Valves"],
  },
  {
    name: "Fixtures",
    slug: "fixtures",
    icon: ShowerHead,
    color: "from-cyan-600/30 to-cyan-800/10",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/15",
    description:
      "Taps, mixers, showers, basins and sanitaryware from top brands for modern bathrooms and kitchens.",
    productCount: 60,
    subcategories: ["Taps & Mixers", "Showers", "Basins", "Toilets", "Bathtubs"],
  },
  {
    name: "Water Tanks",
    slug: "water-tanks",
    icon: Droplets,
    color: "from-teal-600/30 to-teal-800/10",
    border: "border-teal-500/30",
    iconColor: "text-teal-400",
    iconBg: "bg-teal-500/15",
    description:
      "Plastic and stainless-steel water storage tanks in various capacities for homes and commercial use.",
    productCount: 20,
    subcategories: ["Plastic Tanks", "Steel Tanks", "Underground Tanks"],
  },
  {
    name: "Water Heaters",
    slug: "water-heaters",
    icon: Flame,
    color: "from-red-600/30 to-red-800/10",
    border: "border-red-500/30",
    iconColor: "text-red-400",
    iconBg: "bg-red-500/15",
    description:
      "Electric and gas water heaters, geysers and solar water heating systems for every budget.",
    productCount: 18,
    subcategories: ["Electric Geysers", "Gas Geysers", "Solar Heaters", "Instant Heaters"],
  },
  {
    name: "Pumps",
    slug: "pumps",
    icon: Layers,
    color: "from-green-600/30 to-green-800/10",
    border: "border-green-500/30",
    iconColor: "text-green-400",
    iconBg: "bg-green-500/15",
    description:
      "Submersible, centrifugal and booster pumps for water supply, drainage and irrigation.",
    productCount: 25,
    subcategories: ["Submersible Pumps", "Centrifugal Pumps", "Booster Pumps"],
  },
  {
    name: "Filters & Purifiers",
    slug: "filters",
    icon: Filter,
    color: "from-indigo-600/30 to-indigo-800/10",
    border: "border-indigo-500/30",
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/15",
    description:
      "Sediment filters, RO systems and UV purifiers to ensure clean, safe drinking water.",
    productCount: 22,
    subcategories: ["Sediment Filters", "RO Systems", "UV Purifiers", "Filter Cartridges"],
  },
];

// ─── Page Component ──────────────────────────────────────────────────────────

export default function CategoriesPage() {
  const totalProducts = CATEGORIES.reduce((sum, c) => sum + c.productCount, 0);

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-400 mb-8">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/home" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li className="text-white font-medium">Categories</li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid size={20} className="text-blue-400" />
                </div>
                <span className="text-blue-400 font-medium text-sm">All Categories</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
                Shop by Category
              </h1>
              <p className="text-slate-400 max-w-xl text-lg">
                Browse our complete range of plumbing products — from pipes and
                fittings to sanitaryware and water heaters.
              </p>
            </div>
            <div className="flex-shrink-0 bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-center">
              <p className="text-3xl font-extrabold text-white">{totalProducts}+</p>
              <p className="text-slate-400 text-sm mt-1">Products Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY GRID ───────────────────────────────────────────────── */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.slug}
                  className={`group bg-gradient-to-br ${cat.color} border ${cat.border} rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-1 hover:shadow-2xl`}
                >
                  {/* Icon + Count */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-14 h-14 ${cat.iconBg} rounded-2xl flex items-center justify-center`}>
                      <Icon size={28} className={cat.iconColor} />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-800/60 border border-slate-700 px-2.5 py-1 rounded-full">
                      {cat.productCount} products
                    </span>
                  </div>

                  {/* Name & Description */}
                  <h2 className="text-xl font-bold mb-2">{cat.name}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-grow">
                    {cat.description}
                  </p>

                  {/* Subcategories */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cat.subcategories.slice(0, 3).map((sub) => (
                      <span
                        key={sub}
                        className="text-xs text-slate-400 bg-slate-800/60 border border-slate-700/60 px-2.5 py-1 rounded-full"
                      >
                        {sub}
                      </span>
                    ))}
                    {cat.subcategories.length > 3 && (
                      <span className="text-xs text-slate-500 bg-slate-800/60 border border-slate-700/60 px-2.5 py-1 rounded-full">
                        +{cat.subcategories.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all group-hover:gap-3 border ${cat.border} ${cat.iconColor} hover:bg-white/5`}
                  >
                    Browse {cat.name} <ChevronRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-800/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Can't find what you're looking for?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Our team can source any plumbing product for you. Get in touch and
            we'll help you find exactly what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105"
            >
              Browse All Products <ChevronRight size={18} />
            </Link>
            <a
              href="https://wa.me/923118688410?text=Hi%2C%20I%27m%20looking%20for%20a%20specific%20plumbing%20product"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
