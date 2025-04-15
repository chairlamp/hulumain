// app/food/page.tsx

"use client"

import { FoodBrowser } from "@/components/food/FoodBrowser"

export default function FoodPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Food Menu</h1>
        <FoodBrowser />
      </div>
    </main>
  )
}
