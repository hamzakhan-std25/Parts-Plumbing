
import "../styles/globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Footer from "@/components/layout/Footer";
import AIChatButton from "@/components/chat/AIChatButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hassan Sanitory Store",
  description: "Your trusted sanitary store at 3ff3 + c5v, darra bus stop, swabiRd, Shahmansoor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
           <Header />
        {children}
            <Footer/>


        {/* Floating Buttons */}
        {/* <WhatsAppFloat /> */}
        <AIChatButton />
      </body>
    </html>
  );
}
