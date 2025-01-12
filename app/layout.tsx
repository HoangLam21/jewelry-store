import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { CartProvider } from "@/contexts/CartContext";
import ChatBubble from "@/components/MessengerChat/MessenerChat";
import { BuyNowProvider } from "@/contexts/BuyNowContext";
import { ProductManageProvider } from "@/contexts/ProductManageContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <body cz-shortcut-listen="true">
        <ThemeProvider>
          <ClerkProvider>
          <CartProvider>
            <BuyNowProvider>
              <ProductManageProvider>{children}</ProductManageProvider>
            </BuyNowProvider>
          </CartProvider>
          </ClerkProvider>
        </ThemeProvider>
        <ChatBubble />
      </body>
    </html>
  );
}
