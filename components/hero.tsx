"use client"

import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

function Hero() {
  // Function to handle search
  const handleSearch = () => {
    console.log("Search clicked!")
    // Add your search functionality here
  }

  return (
    <div className="relative">
      <div className="bg-primary/10 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10 z-10" />
        <img
          src="/placeholder.svg?height=500&width=1200"
          alt="Food Delivery"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center w-full"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 drop-shadow-md">Fresh. Tasty. Delivered.</h1>
            <p className="text-lg md:text-xl text-gray-100 mb-6 drop-shadow-sm">
              Discover local favorites and get them delivered to your door.
            </p>

            {/* Search Bar with Clickable Search Icon and Separator */}
            <div className="relative w-full max-w-md mb-6">
              <Input
                type="text"
                placeholder="Search for restaurants or dishes..."
                className="w-full px-4 py-3 pr-16 rounded-lg shadow-lg bg-white text-gray-900 placeholder-gray-500"
              />
              {/* Separator | */}
              <span className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-600">|</span>
              {/* Search Icon as SVG wrapped in a button */}
              <button onClick={handleSearch} className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {/* SVG Search Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-black"
                >
                  <path
                    strokeLinecap="round" // Corrected property
                    strokeLinejoin="round" // Corrected property
                    strokeWidth="2" // Corrected property
                    d="M21 21l-4.35-4.35M18 10a8 8 0 10-8 8 8 8 0 008-8z"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero
