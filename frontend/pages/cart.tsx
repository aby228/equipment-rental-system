"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ShoppingCart, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Truck, 
  Shield,
  Clock,
  Package
} from 'lucide-react'
import { useCurrency } from '@/hooks/useCurrency'

interface CartItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  quantity: number
  rentalHours: number
}

const equipmentData: { [key: string]: any } = {
  '1': {
    name: 'Welder Generator',
    description: 'Professional welding and power generation equipment for construction sites.',
    price: 45.00,
    image: '/images/equipment/welder generator.jpg',
    category: 'Power Generation'
  },
  '2': {
    name: 'Heavy-Duty Grout Pump',
    description: 'Industrial grout pump for concrete and construction applications.',
    price: 35.00,
    image: '/images/equipment/HEAVY-DUTY GROUT PUMP.jpg',
    category: 'Pumps & Water'
  },
  '3': {
    name: 'Tube and Clamp Scaffold System',
    description: 'Versatile scaffolding system for construction and maintenance work.',
    price: 25.00,
    image: '/images/equipment/Tube and Clamp Scaffold System.jpg',
    category: 'Access Equipment'
  },
  '4': {
    name: 'Self-Priming Sewage Trash Pump',
    description: 'Heavy-duty pump for sewage and waste water management.',
    price: 40.00,
    image: '/images/equipment/AMT Self-Priming Sewage Trash Pump.jpg',
    category: 'Pumps & Water'
  },
  '5': {
    name: 'Electric Auxiliary Water Pump',
    description: 'Reliable electric water pump for various construction applications.',
    price: 20.00,
    image: '/images/equipment/Electric Auxiliary Water Pump.jpg',
    category: 'Pumps & Water'
  },
  '6': {
    name: 'High Torque Impact Wrench',
    description: 'Professional impact wrench for heavy-duty construction tasks.',
    price: 15.00,
    image: '/images/equipment/High Torque Impact Wrench.jpg',
    category: 'Hand Tools'
  },
  '7': {
    name: 'Portable Light Tower',
    description: 'Mobile lighting solution for construction sites and events.',
    price: 55.00,
    image: '/images/equipment/Portable Light Tower.png',
    category: 'Lighting'
  },
  '8': {
    name: 'Self-Propelled Petrol Lawn Mower',
    description: 'Professional lawn mower for landscaping and maintenance work.',
    price: 30.00,
    image: '/images/equipment/self-propelled-petrol-lawnmower.jpg',
    category: 'Landscaping'
  },
  '9': {
    name: 'Stainless Digging Spade',
    description: 'Professional stainless steel digging spade for landscaping and construction work.',
    price: 8.00,
    image: '/images/equipment/Stainless Digging Spade.jpg',
    category: 'Excavation'
  },
  '10': {
    name: 'Shovel with Axe Edge',
    description: 'Multi-purpose shovel with axe edge for cutting roots and digging in tough soil conditions.',
    price: 10.00,
    image: '/images/equipment/Shovel with Axe Edge.jpg',
    category: 'Excavation'
  },
  '11': {
    name: '27" Light Strong Small Spade Shovel',
    description: 'Compact spade shovel perfect for gardening and small excavation projects.',
    price: 6.00,
    image: '/images/equipment/27 Inch Light Strong Small Spade Shovel Mini Kid Gardening Shovel.jpg',
    category: 'Excavation'
  },
  '12': {
    name: 'Trolley Wheelbarrow',
    description: 'Heavy-duty wheelbarrow with trolley design for easy material transport on construction sites.',
    price: 12.00,
    image: '/images/equipment/TROLLEY-WHEELBARROW.jpg',
    category: 'Transport'
  },
  '13': {
    name: 'Heavy-Duty 8 cu ft Poly Wheelbarrow',
    description: 'Large capacity poly wheelbarrow for heavy material transport.',
    price: 15.00,
    image: '/images/equipment/Heavy-Duty, 8 cu ft, Poly Wheelbarrow.jpg',
    category: 'Transport'
  },
  '14': {
    name: 'Gas Push Lawn Mower',
    description: 'Reliable gas-powered push mower for residential and commercial lawn maintenance.',
    price: 18.00,
    image: '/images/equipment/Gas Push Lawn Mower.jpg',
    category: 'Landscaping'
  },
  '15': {
    name: 'Stainless Steel Cement Edger',
    description: 'Professional cement edger for creating clean edges on concrete surfaces.',
    price: 12.00,
    image: '/images/equipment/Stainless Steel Cement Edger.jpeg',
    category: 'Concrete'
  },
  '16': {
    name: '8" x 3" Finishing Trowel',
    description: 'Professional finishing trowel for concrete surface finishing.',
    price: 8.00,
    image: '/images/equipment/8-x-3-finishing-trowel-square-soft-handle.jpg',
    category: 'Concrete'
  },
  '17': {
    name: 'WL12000HE-03-A Portable Generator',
    description: 'High-capacity portable generator for construction sites and emergency power needs.',
    price: 75.00,
    image: '/images/equipment/WL12000HE-03-A Portable Generator.jpg',
    category: 'Power Generation'
  },
  '18': {
    name: 'Cummins Diesel Generator',
    description: 'Industrial-grade diesel generator for heavy-duty power requirements on construction sites.',
    price: 120.00,
    image: '/images/equipment/Cummins-Diesel-Generators.png',
    category: 'Power Generation'
  },
  '19': {
    name: '5-Axle Concrete Mixer',
    description: 'Large capacity concrete mixer for commercial construction projects.',
    price: 95.00,
    image: '/images/equipment/5-Axle Concrete Mixer.jpg',
    category: 'Concrete'
  },
  '20': {
    name: 'Transit Concrete Mixer',
    description: 'Mobile concrete mixer for on-site concrete production and delivery.',
    price: 85.00,
    image: '/images/equipment/transit-concrete-mixer.jpg',
    category: 'Concrete'
  },
  '21': {
    name: 'Concrete Mixer 1.5HP Electric 120V',
    description: 'Electric concrete mixer for small to medium projects.',
    price: 25.00,
    image: '/images/equipment/Concrete Mixer 1.5HP Elecric 120V.jpg',
    category: 'Concrete'
  },
  '22': {
    name: 'Scissor Lift',
    description: 'Versatile scissor lift for elevated work applications.',
    price: 65.00,
    image: '/images/equipment/Scissor Lift.jpg',
    category: 'Access Equipment'
  },
  '23': {
    name: 'Aerial Lifts',
    description: 'Professional aerial lifts for high-level construction and maintenance work.',
    price: 80.00,
    image: '/images/equipment/Aerial Lifts.jpg',
    category: 'Access Equipment'
  },
  '24': {
    name: 'Torque-Impact Wrench',
    description: 'Precision torque impact wrench for controlled fastening.',
    price: 18.00,
    image: '/images/equipment/Torque-Impact Wrench.jpg',
    category: 'Hand Tools'
  }
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isUpdating, setIsUpdating] = useState(false)
  const { formatCurrency } = useCurrency()

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const itemCounts: { [key: string]: number } = {}
    
    savedCart.forEach((itemId: string) => {
      itemCounts[itemId] = (itemCounts[itemId] || 0) + 1
    })

    const items: CartItem[] = Object.entries(itemCounts).map(([id, quantity]) => ({
      id,
      quantity,
      rentalHours: 4, // Default 4 hours
      ...equipmentData[id]
    }))

    setCartItems(items)
  }, [])

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setIsUpdating(true)
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    if (newQuantity === 0) {
      // Remove all instances of this item
      const filteredCart = currentCart.filter((id: string) => id !== itemId)
      localStorage.setItem('cart', JSON.stringify(filteredCart))
    } else {
      // Adjust quantity
      const currentQuantity = currentCart.filter((id: string) => id === itemId).length
      if (newQuantity > currentQuantity) {
        // Add more
        for (let i = currentQuantity; i < newQuantity; i++) {
          currentCart.push(itemId)
        }
      } else {
        // Remove some
        let removed = 0
        for (let i = currentCart.length - 1; i >= 0 && removed < (currentQuantity - newQuantity); i--) {
          if (currentCart[i] === itemId) {
            currentCart.splice(i, 1)
            removed++
          }
        }
      }
      localStorage.setItem('cart', JSON.stringify(currentCart))
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      ).filter(item => item.quantity > 0)
    )
    setIsUpdating(false)
  }

  const updateRentalHours = (itemId: string, newHours: number) => {
    if (newHours < 1) return
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, rentalHours: newHours }
          : item
      )
    )
  }

  const removeItem = (itemId: string) => {
    updateQuantity(itemId, 0)
  }

  const calculateItemTotal = (item: CartItem) => {
    return item.price * item.quantity * item.rentalHours
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.08
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  // Using currency context's formatCurrency

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center space-y-8 p-8">
          <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-display font-bold text-gray-900">Your cart is empty</h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Looks like you haven't added any equipment to your cart yet. 
              Browse our selection and find the perfect tools for your project.
            </p>
          </div>
          <Link href="/products">
            <Button size="lg" className="gap-3 px-8 py-4">
              <Package className="w-5 h-5" />
              Browse Equipment
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/products">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-xl font-display font-semibold text-gray-900">Shopping Cart</h1>
                <p className="text-sm text-gray-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            {/* Only show total in header if there are items */}
            {cartItems.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-600">Total</div>
                  <div className="text-lg font-display font-bold text-blue-600">
                    {formatCurrency(calculateTotal())}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className={`${cartItems.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
            {cartItems.map((item, index) => (
              <Card key={`${item.id}-${index}`} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-display font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Price per hour */}
                      <div className="mb-4">
                        <div className="text-2xl font-display font-bold text-blue-600">
                          {formatCurrency(item.price)}/hour
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Quantity */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity
                          </label>
                          <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-10 w-10 p-0 hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-4 py-2 text-lg font-semibold min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-10 w-10 p-0 hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Rental Hours */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rental Hours
                          </label>
                          <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateRentalHours(item.id, item.rentalHours - 1)}
                              className="h-10 w-10 p-0 hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-4 py-2 text-lg font-semibold min-w-[3rem] text-center">
                              {item.rentalHours}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateRentalHours(item.id, item.rentalHours + 1)}
                              className="h-10 w-10 p-0 hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            {item.quantity} × {item.rentalHours} hours
                          </div>
                          <div className="text-xl font-display font-bold text-gray-900">
                            {formatCurrency(calculateItemTotal(item))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Checkout Summary - Only show if there are items */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <CreditCard className="w-5 h-5" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Pricing */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">{formatCurrency(calculateSubtotal())}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tax (8%)</span>
                        <span className="font-semibold">{formatCurrency(calculateTax())}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-display font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-display font-bold text-blue-600">
                          {formatCurrency(calculateTotal())}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-3 text-sm text-blue-800">
                        <Truck className="w-4 h-4 text-green-600" />
                        <span>Free delivery on orders over $200</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-blue-800">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span>Equipment insurance included</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-blue-800">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span>Flexible rental periods</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Button 
                      size="lg" 
                      className="w-full gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-semibold py-4"
                      disabled={isUpdating}
                    >
                      <CreditCard className="w-5 h-5" />
                      Proceed to Checkout
                    </Button>

                    <div className="text-center text-sm text-gray-500">
                      <p>By proceeding, you agree to our rental terms and conditions</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
