"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface FoodSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function FoodSearch({ onSearch, placeholder = "Search for food..." }: FoodSearchProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pr-16"
      />
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-8 top-0 h-full"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
      <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}
