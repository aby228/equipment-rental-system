export interface Equipment {
  id: string
  name: string
  description: string
  dailyRate: number
  quantity: number
  category?: string | { id: string; name: string }
  image?: string
  createdAt?: string
  updatedAt?: string
}

export interface EquipmentWithIncludes extends Equipment {
  // Add any additional fields that might be included
  category?: {
    id: string
    name: string
  }
}
