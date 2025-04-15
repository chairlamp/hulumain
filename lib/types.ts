export interface Restaurant {
  id: string
  name: string
  image: string
  cuisine: string
  rating: number
  deliveryTime: string
  deliveryFee: number
  featured?: boolean
}

export interface MenuItem {
  id: string
  restaurantId: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  status: "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered"
  deliveryAddress: Address
  paymentMethod: PaymentMethod
  createdAt: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
}

export interface PaymentMethod {
  type: "credit_card" | "paypal" | "cash"
  details?: any
}
