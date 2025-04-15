"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="text-7xl mb-4">🍽️</div>
      <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
      <p className="text-muted-foreground text-lg mb-6">This plate looks empty... maybe try a different dish.</p>
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  )
}
