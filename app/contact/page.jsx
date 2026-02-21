"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  ChevronDown,
  Send,
  CheckCircle,
} from "lucide-react";

// ─── Static Data ─────────────────────────────────────────────────────────────

const CONTACT_INFO = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+92 311 8688410",
    sub: "Chat with us instantly",
    href: "https://wa.me/923118688410?text=Hi%2C%20I%20need%20help%20with%20a%20plumbing%20product",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-500/20",
    external: true,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 335 9183182",
    sub: "Call us during business hours",
    href: "tel:+923359183182",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-500/20",
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@habibstore.pk",
    sub: "We reply within 24 hours",
    href: "mailto:info@habibstore.pk",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-500/20",
    external: false,
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Shop #5, Saddar Road, Swabi, KPK",
    sub: "Visit our showroom",
    href: "https://maps.google.com/?q=Saddar+Road+Swabi+KPK",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-500/20",
    external: true,
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon–Sat: 9:00 AM – 8:00 PM",
    sub: "Sunday: Closed",
    href: null,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-500/20",
    external: false,
  },
];

const FAQS = [
  {
    q: "Do you deliver to Abbottabad, Mardan and other KPK cities?",
    a: "Yes! We deliver across KPK including Peshawar, Mardan, Swat, Abbottabad, Nowshera, Charsadda and surrounding areas. Delivery times vary by location — typically 1–3 business days.",
  },
  {
    q: "Can I get a discount on bulk orders?",
    a: "Absolutely. We offer special pricing for contractors, builders and bulk buyers. Contact us on WhatsApp or call us directly to discuss your requirements and get a custom quote.",
  },
  {
    q: "How do I know which pipe size I need?",
    a: "Our team of plumbing experts can help you choose the right pipe size and type for your project. Just send us a message on WhatsApp with your requirements and we'll guide you.",
  },
  {
    q: "Are your products genuine and under warranty?",
    a: "Yes, all our products are 100% genuine from authorised brands including Alpha, Master, Supreme and Pak Pipes. Products come with manufacturer warranties where applicable.",
  },
  {
    q: "Can I return or exchange a product?",
    a: "We accept returns and exchanges within 7 days of purchase for unused, undamaged products in original packaging. Contact us to initiate a return.",
  },
];

// ─── Contact Form Component ───────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission — replace with EmailJS / API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h3 className="text-xl font-bold">Message Sent!</h3>
        <p className="text-slate-400 max-w-sm">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
        <a
          href="https://wa.me/923118688410?text=Hi%2C%20I%20just%20sent%20a%20contact%20form%20message"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 mt-2"
        >
          <MessageCircle size={18} /> Also Chat on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Engineer Rizwan"
            className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+92 300 1234567"
            className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Subject <span className="text-red-400">*</span>
          </label>
          <select
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white outline-none transition-colors text-sm"
          >
            <option value="" disabled>Select a subject</option>
            <option value="product-inquiry">Product Inquiry</option>
            <option value="bulk-order">Bulk Order / Quote</option>
            <option value="delivery">Delivery Information</option>
            <option value="technical">Technical Advice</option>
            <option value="return">Return / Exchange</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Describe your requirement in detail…"
          className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 self-start"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send size={18} /> Send Message
          </>
        )}
      </button>
    </form>
  );
}

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-800/60 transition-colors"
      >
        <span className="font-medium text-sm text-white">{q}</span>
        <ChevronDown
          size={18}
          className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-slate-700/60 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-8">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/home" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li className="text-white font-medium">Contact</li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Get in Touch</h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              We're here to help with your plumbing needs — from product
              selection to technical advice. Reach out and our team will respond
              promptly.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ──────────────────────────────────────────── */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {CONTACT_INFO.map((item) => {
              const Icon = item.icon;
              const Wrapper = item.href
                ? item.external
                  ? "a"
                  : "a"
                : "div";
              const extraProps =
                item.href
                  ? item.external
                    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                    : { href: item.href }
                  : {};

              return (
                <Wrapper
                  key={item.label}
                  {...extraProps}
                  className={`group bg-slate-800 border ${item.border} rounded-2xl p-5 flex flex-col gap-3 ${item.href ? "hover:border-opacity-60 hover:-translate-y-0.5 transition-all cursor-pointer" : ""}`}
                >
                  <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center`}>
                    <Icon size={20} className={item.color} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className={`font-semibold text-sm ${item.href ? item.color : "text-white"}`}>
                      {item.value}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FORM + MAP ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-slate-400 text-sm mb-8">
                Fill in the form and we'll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Map + WhatsApp CTA */}
            <div className="flex flex-col gap-6">
              {/* Map Embed */}
              <div className="rounded-2xl overflow-hidden border border-slate-700 flex-1 min-h-[300px]">
                <iframe
                  title="Habib Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13228.123456789!2d72.4697!3d34.1219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d917b1234567%3A0xabcdef!2sSaddar%20Road%2C%20Swabi%2C%20KPK!5e0!3m2!1sen!2spk!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "300px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* WhatsApp Quick CTA */}
              <div className="bg-green-900/20 border border-green-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-12 h-12 bg-green-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={24} className="text-green-400" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-semibold mb-1">Prefer instant help?</p>
                  <p className="text-slate-400 text-sm">
                    Chat with us on WhatsApp for the fastest response.
                  </p>
                </div>
                <a
                  href="https://wa.me/923118688410?text=Hi%2C%20I%20need%20help%20with%20a%20plumbing%20product"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-3 rounded-xl transition-all hover:scale-105 whitespace-nowrap text-sm flex-shrink-0"
                >
                  Chat Now <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-slate-400">
              Quick answers to common questions — can't find yours? Just ask us!
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-slate-400 text-sm mb-4">Still have questions?</p>
            <a
              href="https://wa.me/923118688410?text=Hi%2C%20I%20have%20a%20question%20about%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105"
            >
              <MessageCircle size={18} /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
