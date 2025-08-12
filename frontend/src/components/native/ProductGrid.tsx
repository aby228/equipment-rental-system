'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart, Clock, Plus } from 'lucide-react'
import { AddToCartModal } from '@/components/ui/add-to-cart-modal'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  category?: string
  image: string
  rating?: number
  reviews?: number
  inStock: boolean
  isNew?: boolean
  isFeatured?: boolean
}

interface ProductGridProps {
  products: Product[]
  title?: string
  description?: string
  showFilters?: boolean
}

export default function ProductGrid({ products, title, description, showFilters = false }: ProductGridProps) {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [cart, setCart] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product.id])
    // Store in localStorage for persistence
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const updatedCart = [...currentCart, product.id]
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    // Show modal
    setSelectedProduct(product)
    setShowModal(true)
  }

  const rentNow = (productId: string) => {
    // Clear cart and add only this item for immediate rental
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const updatedCart = [productId]
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    // Redirect to cart page
    window.location.href = '/cart'
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedProduct(null)
  }

  return (
    <div className="space-y-8">
      {(title || description) && (
        <div className="text-center space-y-4">
          {title && <h2 className="text-3xl font-display font-bold text-gray-900">{title}</h2>}
          {description && <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">{description}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 bg-white overflow-hidden">
            <CardHeader className="p-0 relative">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-lg"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`} 
                  />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-display font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-xl font-display font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">/hr</span>
                  </div>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through font-medium">
                      ${product.originalPrice.toFixed(2)}/hr
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-6 pt-0">
              <div className="w-full flex gap-2">
                <Button
                  onClick={() => rentNow(product.id)}
                  disabled={!product.inStock}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200"
                >
                  {product.inStock ? (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Rent Now
                    </>
                  ) : (
                    'Out of Stock'
                  )}
                </Button>
                <Button
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  variant="outline"
                  className="px-3 py-3 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add to Cart Modal */}
      <AddToCartModal
        isOpen={showModal}
        onClose={closeModal}
        product={selectedProduct}
      />
    </div>
  )
} 