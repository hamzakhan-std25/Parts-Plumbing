
import "../styles/globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Habib Store",
  description: "Your trusted plumbing store in swabi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
           <Header />
        {children}
            <Footer/>


        {/* Floating Button */}
        <WhatsAppFloat />
      </body>
    </html>
  );
}