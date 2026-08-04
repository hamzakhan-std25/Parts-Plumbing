import "../styles/globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Footer from "@/components/layout/Footer";
import AIChatButton from "@/components/chat/AIChatButton";
import { SITE_URL } from "@/constants/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Parts Plumbing Store",
    template: "%s | Parts Plumbing Store",
  },
  description:
    "Parts Plumbing Store offers quality plumbing and sanitary products with reliable support and fast service.",
  openGraph: {
    title: "Parts Plumbing Store",
    description:
      "Shop trusted plumbing and sanitary products, with expert guidance for homes and projects.",
    type: "website",
    url: SITE_URL,
    siteName: "Parts Plumbing Store",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />

        {/* Floating Buttonsy */}
        {/* <WhatsAppFloat /> */}
        <AIChatButton />
      </body>
    </html>
  );
}
