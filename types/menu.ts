export type MenuOptionItem = {
  id: number
  name: string
  price: number
}

export type MenuOption = {
  id: number
  name: string
  required: boolean
  items: MenuOptionItem[]
}

export type MenuItem = {
  id: number
  name: string
  description: string
  price: number
  image?: string
  options?: MenuOption[]
}

export type MenuCategory = {
  id: number
  name: string
  items: MenuItem[]
}
