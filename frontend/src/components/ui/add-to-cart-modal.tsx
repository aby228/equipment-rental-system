"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, ShoppingCart, X, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCurrency } from '@/hooks/useCurrency'

interface AddToCartModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    name: string
    image: string
    price: number
  } | null
}

export function AddToCartModal({ isOpen, onClose, product }: AddToCartModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { formatCurrency } = useCurrency()

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Auto close after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for animation to complete
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
      return undefined
    }
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative transform transition-all duration-300 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        <Card className="w-96 max-w-[90vw] border-0 shadow-2xl bg-white overflow-hidden">
          <CardContent className="p-0">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white text-center relative">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-display font-semibold">Added to Cart!</h3>
              <p className="text-green-100 text-sm">Your equipment has been added successfully</p>
              
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Product Details */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg shadow-sm"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-semibold text-gray-900 mb-1 truncate">
                    {product.name}
                  </h4>
                  <p className="text-2xl font-display font-bold text-blue-600">
                    {formatCurrency(product.price)}/hour
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link href="/cart" onClick={onClose}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    View Cart
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>

              {/* Quick Info */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Item added to your cart</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
