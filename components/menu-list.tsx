"use client"

import type React from "react"

import { useState } from "react"
import { Plus, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

// Import mock data from lib
import { menuCategories, mockRestaurants } from "@/lib/menuData"

type MenuListProps = {
  restaurantId: number
}

export function MenuList({ restaurantId }: MenuListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>({})
  const [quantity, setQuantity] = useState(1)
  const { items, addItem, removeItem, updateQuantity, cartTotal } = useCart()
  const { toast } = useToast()

  const restaurant = mockRestaurants.find((r) => r.id === restaurantId)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filteredCategories = menuCategories
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.items.length > 0)

  const handleOpenItemDialog = (item: any) => {
    setSelectedItem(item)
    setQuantity(1)

    // Initialize selected options for required selections
    const initialOptions: Record<string, any> = {}
    if (item.options) {
      item.options.forEach((option: any) => {
        if (option.required) {
          initialOptions[option.id] = option.items[0].id
        }
      })
    }
    setSelectedOptions(initialOptions)
  }

  const handleAddToCart = () => {
    if (!selectedItem) return

    // Validate required options
    if (selectedItem.options) {
      const requiredOptions = selectedItem.options.filter((opt: any) => opt.required)
      const missingRequired = requiredOptions.some((opt: any) => !selectedOptions[opt.id])

      if (missingRequired) {
        toast({
          title: "Missing selections",
          description: "Please make all required selections",
          variant: "destructive",
        })
        return
      }
    }

    // Prepare selected options for the cart
    const itemOptions = selectedItem.options
      ? selectedItem.options.flatMap((option: any) => {
          if (option.required && selectedOptions[option.id]) {
            // For required/single selection options
            const selectedOpt = option.items.find((item: any) => item.id === selectedOptions[option.id])
            return selectedOpt
              ? [
                  {
                    id: selectedOpt.id,
                    name: `${option.name}: ${selectedOpt.name}`,
                    price: selectedOpt.price,
                  },
                ]
              : []
          } else if (!option.required) {
            // For optional/multiple selection options
            const selectedOpts = selectedOptions[option.id] || []
            return option.items
              .filter((item: any) => selectedOpts.includes(item.id))
              .map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
              }))
          }
          return []
        })
      : undefined

    // Add to cart
    addItem(
      {
        id: selectedItem.id,
        name: selectedItem.name,
        price: selectedItem.price,
        quantity: quantity,
        options: itemOptions,
      },
      restaurantId,
      restaurant?.name || "",
    )

    toast({
      title: "Added to cart",
      description: `${quantity} x ${selectedItem.name} added to your order`,
    })

    // Reset
    setSelectedItem(null)
    setSelectedOptions({})
    setQuantity(1)
  }

  const handleOptionSelect = (optionId: number, itemId: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: itemId,
    }))
  }

  const handleMultipleOptionSelect = (optionId: number, itemId: number) => {
    setSelectedOptions((prev) => {
      const currentSelections = prev[optionId] || []

      if (currentSelections.includes(itemId)) {
        // Remove if already selected
        return {
          ...prev,
          [optionId]: currentSelections.filter((id: number) => id !== itemId),
        }
      } else {
        // Add if not selected
        return {
          ...prev,
          [optionId]: [...currentSelections, itemId],
        }
      }
    })
  }

  const calculateItemTotal = () => {
    if (!selectedItem) return 0

    let total = selectedItem.price * quantity

    // Add option prices
    if (selectedItem.options) {
      selectedItem.options.forEach((option: any) => {
        if (option.required && selectedOptions[option.id]) {
          const selectedOpt = option.items.find((item: any) => item.id === selectedOptions[option.id])
          if (selectedOpt) {
            total += selectedOpt.price * quantity
          }
        } else if (!option.required && selectedOptions[option.id]) {
          const selectedOpts = selectedOptions[option.id] || []
          option.items.forEach((item: any) => {
            if (selectedOpts.includes(item.id)) {
              total += item.price * quantity
            }
          })
        }
      })
    }

    return total
  }

  return (
    <div>
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={handleSearch}
          className="max-w-md"
        />
      </div>

      <div className="space-y-12">
        {filteredCategories.map((category) => (
          <div key={category.id}>
            <h2 className="text-xl font-bold mb-4">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex">
                    <CardContent className="p-4 flex-1">
                      <div className="flex flex-col h-full">
                        <div>
                          <h3 className="font-bold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                          <p className="font-medium">{item.price} Birr</p>
                        </div>
                        <div className="mt-auto pt-3">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => handleOpenItemDialog(item)}>
                                <Plus className="h-4 w-4 mr-1" />
                                Add to Order
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>{selectedItem?.name}</DialogTitle>
                                <DialogDescription>{selectedItem?.description}</DialogDescription>
                              </DialogHeader>

                              <div className="space-y-4 py-4 max-h-[50vh] overflow-auto">
                                {selectedItem?.options?.map((option: any) => (
                                  <div key={option.id} className="space-y-2">
                                    <h4 className="font-medium">
                                      {option.name}
                                      {option.required && <span className="text-red-500">*</span>}
                                    </h4>

                                    {option.required ? (
                                      <RadioGroup
                                        value={selectedOptions[option.id]?.toString()}
                                        onValueChange={(value) => handleOptionSelect(option.id, Number.parseInt(value))}
                                      >
                                        {option.items.map((item: any) => (
                                          <div key={item.id} className="flex items-center justify-between space-x-2">
                                            <div className="flex items-center space-x-2">
                                              <RadioGroupItem
                                                value={item.id.toString()}
                                                id={`option-${option.id}-${item.id}`}
                                              />
                                              <Label htmlFor={`option-${option.id}-${item.id}`}>{item.name}</Label>
                                            </div>
                                            {item.price > 0 && <span className="text-sm">+{item.price} Birr</span>}
                                          </div>
                                        ))}
                                      </RadioGroup>
                                    ) : (
                                      <div className="space-y-2">
                                        {option.items.map((item: any) => (
                                          <div key={item.id} className="flex items-center justify-between space-x-2">
                                            <div className="flex items-center space-x-2">
                                              <Checkbox
                                                id={`option-${option.id}-${item.id}`}
                                                checked={(selectedOptions[option.id] || []).includes(item.id)}
                                                onCheckedChange={() => handleMultipleOptionSelect(option.id, item.id)}
                                              />
                                              <Label htmlFor={`option-${option.id}-${item.id}`}>{item.name}</Label>
                                            </div>
                                            {item.price > 0 && <span className="text-sm">+{item.price} Birr</span>}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}

                                <div className="space-y-2">
                                  <h4 className="font-medium">Quantity</h4>
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    >
                                      -
                                    </Button>
                                    <span className="w-8 text-center">{quantity}</span>
                                    <Button variant="outline" size="icon" onClick={() => setQuantity((q) => q + 1)}>
                                      +
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              <div className="py-4">
                                <div className="flex justify-between">
                                  <span className="font-medium">Total:</span>
                                  <span className="font-bold">{calculateItemTotal()} Birr</span>
                                </div>
                              </div>

                              <DialogFooter>
                                <Button onClick={handleAddToCart} className="w-full">
                                  Add to Order • {calculateItemTotal()} Birr
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                    <div className="w-24 h-24 relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Button */}
      {items.length > 0 && (
        <Sheet>
          <SheetTrigger asChild>
            <Button size="lg" className="fixed bottom-6 right-6 z-50 shadow-lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              View Cart • {cartTotal} Birr
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Your Order</SheetTitle>
              <SheetDescription>
                {items.length} items from {restaurant?.name}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4 py-4 max-h-[60vh] overflow-auto">
              {items.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">x{item.quantity}</span>
                      </div>
                      {item.options && item.options.length > 0 && (
                        <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                          {item.options.map((option) => (
                            <li key={option.id} className="flex justify-between">
                              <span>{option.name}</span>
                              {option.price > 0 && <span>+{option.price} Birr</span>}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right">{item.price * item.quantity} Birr</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-6 w-6 p-0 text-muted-foreground"
                      >
                        ×
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>

                  <Separator />
                </div>
              ))}
            </div>

            <div className="space-y-2 py-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{cartTotal} Birr</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{restaurant?.id ? Number.parseFloat((restaurant.id * 25).toFixed(2)) : 0} Birr</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{cartTotal + (restaurant?.id ? restaurant.id * 25 : 0)} Birr</span>
              </div>
            </div>

            <SheetFooter className="mt-4">
              <Button className="w-full">Proceed to Checkout</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
