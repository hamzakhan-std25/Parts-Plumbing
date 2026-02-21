import Link from "next/link";
import { getProducts } from "@/services/product.service";
import ProductCard from "@/components/product/ProductCard";
import Footer from "@/components/layout/Footer";
import {
  CheckCircle,
  Truck,
  MessageCircle,
  BadgeDollarSign,
  Pipette,
  Wrench,
  Gauge,
  ShowerHead,
  Star,
  ChevronRight,
  Search,
} from "lucide-react";

// ─── Static Data ────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    name: "Pipes",
    slug: "pipes",
    icon: Pipette,
    description: "PPR, PVC & GI pipes for every application",
    image: null,
  },
  {
    name: "Fittings",
    slug: "fittings",
    icon: Wrench,
    description: "Elbows, tees, couplings & more",
    image: null,
  },
  {
    name: "Valves",
    slug: "valves",
    icon: Gauge,
    description: "Ball valves, gate valves & pressure regulators",
    image: null,
  },
  {
    name: "Fixtures",
    slug: "fixtures",
    icon: ShowerHead,
    description: "Taps, showers, basins & sanitaryware",
    image: null,
  },
];

const WHY_CHOOSE_US = [
  {
    icon: CheckCircle,
    color: "text-green-400",
    bg: "bg-green-400/10",
    title: "Genuine Products",
    desc: "100% authentic brands — Alpha, Master, Supreme & more",
  },
  {
    icon: Truck,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    title: "Fast Delivery Across KPK",
    desc: "Peshawar, Mardan, Swat, Abbottabad & surrounding areas",
  },
  {
    icon: MessageCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    title: "Expert Advice on WhatsApp",
    desc: "Instant plumbing support from our experienced team",
  },
  {
    icon: BadgeDollarSign,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    title: "Competitive Prices",
    desc: "Direct from manufacturers — no middlemen",
  },
];

const TESTIMONIALS = [
  {
    name: "Engineer Rizwan",
    location: "Peshawar",
    rating: 5,
    text: "Excellent quality pipes and very fast delivery. Habib Store is my go-to for all plumbing supplies on every project.",
  },
  {
    name: "Contractor Bilal",
    location: "Mardan",
    rating: 5,
    text: "Bulk order was handled professionally. Got genuine Alpha fittings at the best price in the market. Highly recommended!",
  },
  {
    name: "Usman Khan",
    location: "Abbottabad",
    rating: 5,
    text: "WhatsApp support is amazing — they helped me choose the right valve size within minutes. Great service!",
  },
];

const BRANDS = ["Alpha", "Master", "Supreme", "Pak Pipes", "Nayab"];

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function HomePage() {
  // Fetch 6 featured products
  const data = await getProducts(6);
  const featuredProducts = data?.nodes || [];

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 text-center sm:mt-0 mt-4">
          <span className="inline-block bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            🏆 Trusted Plumbing Supplier in KPK
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Your Trusted Partner for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Plumbing Supplies
            </span>{" "}
            in KPK
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Quality Pipes, Fittings &amp; Sanitaryware — Delivered to Your
            Doorstep across Peshawar, Mardan, Swat &amp; beyond.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-600/30"
            >
              Shop Now <ChevronRight size={18} />
            </Link>
            <a
              href="https://wa.me/923118688410?text=Hi%2C%20I%20need%20expert%20advice%20on%20plumbing%20supplies"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-green-600/30"
            >
              <MessageCircle size={18} /> Get Expert Advice
            </a>
          </div>

          {/* ── 2. SEARCH BAR ─────────────────────────────────────────────── */}
          <div className="max-w-2xl mx-auto">
            <form
              action="/products"
              method="GET"
              className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl"
            >
              <Search className="ml-4 text-slate-400 flex-shrink-0" size={20} />
              <input
                type="text"
                name="search"
                placeholder="Search pipes, fittings, valves…"
                className="flex-1 bg-transparent px-4 py-4 text-white placeholder-slate-400 outline-none text-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold sm:px-6 px-1 py-4 transition-colors text-sm"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── 3. CATEGORY HIGHLIGHTS ──────────────────────────────────────── */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Shop by Category</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Browse our wide range of plumbing products organised by category
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className="group bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/50 rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="w-16 h-16 bg-blue-600/15 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                    <Icon size={32} className="text-blue-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{cat.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{cat.description}</p>
                  <span className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Products <ChevronRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PRODUCTS ────────────────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                <p className="text-slate-400">
                  Top-selling items our customers love
                </p>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} isFeatured />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105"
              >
                View All Products <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 5. WHY CHOOSE US ────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Choose Habib Store?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              We've been serving KPK's plumbing needs with quality and trust
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col items-start gap-4"
                >
                  <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center`}>
                    <Icon size={24} className={item.color} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Our Customers Say</h2>
            <p className="text-slate-400">Real feedback from real customers across KPK</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{t.text}"
                </p>
                <div className="mt-auto pt-4 border-t border-slate-700">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. BRANDS WE CARRY ──────────────────────────────────────────── */}
      <section className="py-16 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Brands We Carry</h2>
            <p className="text-slate-400 text-sm">
              Authorised dealer for Pakistan's leading plumbing brands
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6">
            {BRANDS.map((brand) => (
              <div
                key={brand}
                className="bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-xl px-8 py-4 text-slate-400 hover:text-white font-bold text-lg tracking-wide transition-all hover:scale-105 cursor-default"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. NEWSLETTER / CTA ─────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-900/60 to-slate-800 border border-blue-500/20 rounded-3xl p-10 md:p-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>
            <p className="text-slate-300 mb-8">
              Subscribe for exclusive offers, new arrivals &amp; plumbing tips
              delivered straight to your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8" >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-slate-800 border border-slate-600 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors text-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            <p className="text-slate-400 text-sm mb-6">
              Or get instant help on WhatsApp
            </p>
            <a
              href="https://wa.me/923118688410?text=Hi%2C%20I%27d%20like%20to%20know%20about%20your%20latest%20offers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
