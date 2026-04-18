import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import FloatingSocials from "@/components/FloatingSocials";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Timeless Elegance | Luxury Evening Dresses",
  description: "High-end eCommerce specializing in luxury evening dresses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <LanguageProvider>
          <CartProvider>
            {children}
            <FloatingSocials />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
