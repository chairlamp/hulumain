// app/(main)/layout.tsx
import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/contexts/cart-context";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      {/* Note: Do not include <html> or <body> tags here;
                these come from the root layout */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <CartProvider>
          <Header session={session} />
          {children}
          <Toaster />
        </CartProvider>
      </ThemeProvider>
    </>
  );
}
