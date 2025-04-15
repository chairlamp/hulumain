"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface FoodFiltersProps {
  onApplyFilters: (filters: FilterOptions) => void
  initialFilters?: Partial<FilterOptions>
}

export interface FilterOptions {
  priceRange: [number, number]
  dietaryPreferences: {
    vegetarian: boolean
    vegan: boolean
    glutenFree: boolean
  }
  minRating: number
  maxDeliveryTime: number
}

const DEFAULT_FILTERS: FilterOptions = {
  priceRange: [0, 50],
  dietaryPreferences: {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  },
  minRating: 0,
  maxDeliveryTime: 60,
}

export function FoodFilters({ onApplyFilters, initialFilters = {} }: FoodFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  })

  const [open, setOpen] = useState(false)

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [value[0], value[1]],
    }))
  }

  const handleDietaryChange = (key: keyof FilterOptions["dietaryPreferences"], value: boolean) => {
    setFilters((prev) => ({
      ...prev,
      dietaryPreferences: {
        ...prev.dietaryPreferences,
        [key]: value,
      },
    }))
  }

  const handleRatingChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      minRating: value[0],
    }))
  }

  const handleDeliveryTimeChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      maxDeliveryTime: value[0],
    }))
  }

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS)
  }

  const applyFilters = () => {
    onApplyFilters(filters)
    setOpen(false)
  }

  // Count active filters
  const activeFilterCount = [
    filters.priceRange[0] > DEFAULT_FILTERS.priceRange[0] || filters.priceRange[1] < DEFAULT_FILTERS.priceRange[1],
    filters.dietaryPreferences.vegetarian,
    filters.dietaryPreferences.vegan,
    filters.dietaryPreferences.glutenFree,
    filters.minRating > DEFAULT_FILTERS.minRating,
    filters.maxDeliveryTime < DEFAULT_FILTERS.maxDeliveryTime,
  ].filter(Boolean).length

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Refine your food search with these filters.</SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Price Range</h3>
              <span className="text-sm text-muted-foreground">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </span>
            </div>
            <Slider
              defaultValue={filters.priceRange}
              min={0}
              max={50}
              step={1}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              className="mt-2"
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Dietary Preferences</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="vegetarian" className="flex items-center gap-2">
                  Vegetarian
                </Label>
                <Switch
                  id="vegetarian"
                  checked={filters.dietaryPreferences.vegetarian}
                  onCheckedChange={(checked) => handleDietaryChange("vegetarian", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="vegan" className="flex items-center gap-2">
                  Vegan
                </Label>
                <Switch
                  id="vegan"
                  checked={filters.dietaryPreferences.vegan}
                  onCheckedChange={(checked) => handleDietaryChange("vegan", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="glutenFree" className="flex items-center gap-2">
                  Gluten Free
                </Label>
                <Switch
                  id="glutenFree"
                  checked={filters.dietaryPreferences.glutenFree}
                  onCheckedChange={(checked) => handleDietaryChange("glutenFree", checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Minimum Rating</h3>
              <span className="text-sm text-muted-foreground">{filters.minRating} ⭐</span>
            </div>
            <Slider
              defaultValue={[filters.minRating]}
              min={0}
              max={5}
              step={0.5}
              value={[filters.minRating]}
              onValueChange={handleRatingChange}
              className="mt-2"
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Max Delivery Time</h3>
              <span className="text-sm text-muted-foreground">{filters.maxDeliveryTime} min</span>
            </div>
            <Slider
              defaultValue={[filters.maxDeliveryTime]}
              min={10}
              max={60}
              step={5}
              value={[filters.maxDeliveryTime]}
              onValueChange={handleDeliveryTimeChange}
              className="mt-2"
            />
          </div>
        </div>
        <SheetFooter className="flex-row justify-between sm:justify-between gap-2">
          <Button variant="outline" onClick={resetFilters} className="flex-1">
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={applyFilters} className="flex-1">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
