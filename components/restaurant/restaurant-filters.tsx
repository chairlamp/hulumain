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
import { Checkbox } from "@/components/ui/checkbox"

interface RestaurantFiltersProps {
  onApplyFilters: (filters: FilterOptions) => void
  initialFilters?: Partial<FilterOptions>
  cuisineTypes: string[]
}

export interface FilterOptions {
  priceRange: [number, number]
  maxDeliveryTime: number
  maxDeliveryFee: number
  minRating: number
  maxDistance: number
  cuisines: string[]
  features: {
    openNow: boolean
    freeDelivery: boolean
    offers: boolean
  }
}

const DEFAULT_FILTERS: FilterOptions = {
  priceRange: [0, 50],
  maxDeliveryTime: 60,
  maxDeliveryFee: 10,
  minRating: 0,
  maxDistance: 10,
  cuisines: [],
  features: {
    openNow: false,
    freeDelivery: false,
    offers: false,
  },
}

export function RestaurantFilters({ onApplyFilters, initialFilters = {}, cuisineTypes }: RestaurantFiltersProps) {
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

  const handleDeliveryTimeChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      maxDeliveryTime: value[0],
    }))
  }

  const handleDeliveryFeeChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      maxDeliveryFee: value[0],
    }))
  }

  const handleRatingChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      minRating: value[0],
    }))
  }

  const handleDistanceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      maxDistance: value[0],
    }))
  }

  const handleFeatureChange = (key: keyof FilterOptions["features"], value: boolean) => {
    setFilters((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [key]: value,
      },
    }))
  }

  const handleCuisineChange = (cuisine: string, checked: boolean) => {
    setFilters((prev) => {
      if (checked) {
        return {
          ...prev,
          cuisines: [...prev.cuisines, cuisine],
        }
      } else {
        return {
          ...prev,
          cuisines: prev.cuisines.filter((c) => c !== cuisine),
        }
      }
    })
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
    filters.maxDeliveryTime < DEFAULT_FILTERS.maxDeliveryTime,
    filters.maxDeliveryFee < DEFAULT_FILTERS.maxDeliveryFee,
    filters.minRating > DEFAULT_FILTERS.minRating,
    filters.maxDistance < DEFAULT_FILTERS.maxDistance,
    filters.cuisines.length > 0,
    filters.features.openNow,
    filters.features.freeDelivery,
    filters.features.offers,
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
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Refine your restaurant search with these filters.</SheetDescription>
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

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Max Delivery Fee</h3>
              <span className="text-sm text-muted-foreground">${filters.maxDeliveryFee.toFixed(2)}</span>
            </div>
            <Slider
              defaultValue={[filters.maxDeliveryFee]}
              min={0}
              max={10}
              step={0.5}
              value={[filters.maxDeliveryFee]}
              onValueChange={handleDeliveryFeeChange}
              className="mt-2"
            />
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
              <h3 className="font-medium">Max Distance</h3>
              <span className="text-sm text-muted-foreground">{filters.maxDistance} miles</span>
            </div>
            <Slider
              defaultValue={[filters.maxDistance]}
              min={1}
              max={10}
              step={0.5}
              value={[filters.maxDistance]}
              onValueChange={handleDistanceChange}
              className="mt-2"
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Features</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="openNow" className="flex items-center gap-2">
                  Open Now
                </Label>
                <Switch
                  id="openNow"
                  checked={filters.features.openNow}
                  onCheckedChange={(checked) => handleFeatureChange("openNow", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="freeDelivery" className="flex items-center gap-2">
                  Free Delivery
                </Label>
                <Switch
                  id="freeDelivery"
                  checked={filters.features.freeDelivery}
                  onCheckedChange={(checked) => handleFeatureChange("freeDelivery", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="offers" className="flex items-center gap-2">
                  Special Offers
                </Label>
                <Switch
                  id="offers"
                  checked={filters.features.offers}
                  onCheckedChange={(checked) => handleFeatureChange("offers", checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Cuisine Types</h3>
            <div className="grid grid-cols-2 gap-2">
              {cuisineTypes.map((cuisine) => (
                <div key={cuisine} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cuisine-${cuisine}`}
                    checked={filters.cuisines.includes(cuisine)}
                    onCheckedChange={(checked) => handleCuisineChange(cuisine, checked as boolean)}
                  />
                  <label
                    htmlFor={`cuisine-${cuisine}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {cuisine}
                  </label>
                </div>
              ))}
            </div>
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
