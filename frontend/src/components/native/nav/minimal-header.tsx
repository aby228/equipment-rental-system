"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Search } from "lucide-react"
import { SearchAutocomplete } from "@/components/ui/search-autocomplete"
import config from "@/config/site"

// Equipment data for search suggestions
const equipmentSuggestions = [
  { id: '1', name: 'Diesel Generator', category: 'Power Generation', type: 'equipment' as const },
  { id: '2', name: 'Water Pump', category: 'Water Equipment', type: 'equipment' as const },
  { id: '3', name: 'Concrete Mixer', category: 'Concrete Equipment', type: 'equipment' as const },
  { id: '4', name: 'Excavator', category: 'Earthmoving', type: 'equipment' as const },
  { id: '5', name: 'Bulldozer', category: 'Earthmoving', type: 'equipment' as const },
  { id: '6', name: 'Crane', category: 'Lifting Equipment', type: 'equipment' as const },
  { id: '7', name: 'Compressor', category: 'Air Equipment', type: 'equipment' as const },
  { id: '8', name: 'Welder', category: 'Welding Equipment', type: 'equipment' as const },
  { id: '9', name: 'Scaffolding', category: 'Access Equipment', type: 'equipment' as const },
  { id: '10', name: 'Aerial Lift', category: 'Access Equipment', type: 'equipment' as const },
  { id: '11', name: 'Power Generation', category: 'Equipment Category', type: 'category' as const },
  { id: '12', name: 'Water Equipment', category: 'Equipment Category', type: 'category' as const },
  { id: '13', name: 'Concrete Equipment', category: 'Equipment Category', type: 'category' as const },
  { id: '14', name: 'Earthmoving', category: 'Equipment Category', type: 'category' as const },
  { id: '15', name: 'Lifting Equipment', category: 'Equipment Category', type: 'category' as const },
  { id: '16', name: 'Air Equipment', category: 'Equipment Category', type: 'category' as const },
  { id: '17', name: 'Welding Equipment', category: 'Equipment Category', type: 'category' as const },
  { id: '18', name: 'Access Equipment', category: 'Equipment Category', type: 'category' as const },
]

export default function MinimalHeader() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // You can add navigation logic here if needed
    console.log('Search query:', query)
  }

  const handleSuggestionSelect = (suggestion: any) => {
    // Navigate to products page with search query
    window.location.href = `/products?search=${encodeURIComponent(suggestion.name)}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt={`${config.name} Logo`} width={28} height={28} className="rounded" />
          <span className="hidden text-sm font-semibold sm:inline-block">{config.name}</span>
        </Link>

        {/* Center: Search */}
        <div className="hidden flex-1 max-w-md mx-8 md:block">
          <SearchAutocomplete
            placeholder="Search equipment..."
            suggestions={equipmentSuggestions}
            onSearch={handleSearch}
            onSuggestionSelect={handleSuggestionSelect}
            className="w-full"
          />
        </div>

        {/* Center: Minimal nav (desktop) */}
        <nav className="hidden items-center gap-6 text-sm text-gray-700 md:flex">
          <Link href="/products" className="hover:text-black">Shop</Link>
          <Link href="/#about" className="hover:text-black">About</Link>
          <Link href="#contact" className="hover:text-black">Contact</Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile search button */}
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Search" 
            className="md:hidden"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Link href="/cart">
            <Button variant="outline" size="sm" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm">Sign in</Button>
          </Link>
        </div>
      </div>

      {/* Mobile search dropdown */}
      {showMobileSearch && (
        <div className="md:hidden border-t bg-white p-4">
          <SearchAutocomplete
            placeholder="Search equipment..."
            suggestions={equipmentSuggestions}
            onSearch={handleSearch}
            onSuggestionSelect={handleSuggestionSelect}
            className="w-full"
          />
        </div>
      )}
    </header>
  )
}
