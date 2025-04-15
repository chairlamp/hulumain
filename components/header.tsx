"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartDropdown } from "@/components/cart/cart-dropdown"
import { useCart } from "@/contexts/cart-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

interface HeaderProps {
  session: any // Adjust the type as per your session structure
}

export function Header({ session }: HeaderProps) {
  const { getItemCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const itemCount = getItemCount()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/restaurants", label: "Restaurants" },
    { href: "/food", label: "Food Menu" },
    { href: "/cart", label: `Cart (${itemCount})` },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg shadow-lg px-4 py-1.5">
      <div className="container flex h-14 items-center justify-between mx-auto max-w-screen-xl">
        <div className="flex items-center gap-2">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">Welcome to Kech!</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartDropdown />
          {session ? (
            <div className="flex items-center gap-4">
              <p className="text-sm">Hello, {session.user?.name || session.user?.email}!</p>
              <form method="post" action="/api/auth/signout">
                <button type="submit" className="text-sm text-red-600 hover:underline">
                  Logout
                </button>
              </form>
              <Button asChild size="sm">
                <Link href="/admin-dashboard">Go to Admin Dashboard</Link>
              </Button>
              <Button asChild size="sm" variant="secondary">
                <Link href="/user-dashboard">Go to User Dashboard</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/driver-dashboard">Go to Driver Dashboard</Link>
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/auth/login" className="text-sm underline text-primary">
                Login
              </Link>
              <Link href="/auth/register" className="text-sm underline">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
