"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Search, User, LogOut, Settings, Package, Heart, DollarSign } from "lucide-react"
import { SearchAutocomplete } from "@/components/ui/search-autocomplete"
import { UserAvatar } from "@/components/ui/user-avatar"
import { useAuth } from "@/hooks/useAuth"
import { useCurrency } from "@/hooks/useCurrency"
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

interface UserData {
  id: string
  name: string
  email: string
  avatar?: string
}

export default function MinimalHeader() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const { user, isLoggedIn, logout } = useAuth()
  const { currency, toggleCurrency } = useCurrency()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // You can add navigation logic here if needed
    console.log('Search query:', query)
  }

  const handleSuggestionSelect = (suggestion: any) => {
    // Navigate to products page with search query
    window.location.href = `/products?search=${encodeURIComponent(suggestion.name)}`
  }

  const handleLogout = () => {
    logout()
    setShowProfileDropdown(false)
    // Redirect to home page
    window.location.href = '/'
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
          {/* Currency toggle */}
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 hidden sm:flex"
            onClick={toggleCurrency}
            title={`Switch currency (current: ${currency})`}
          >
            <DollarSign className="h-4 w-4" />
            {currency}
          </Button>
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

          {/* User Profile or Sign In */}
          {isLoggedIn && user ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-8 w-8 rounded-full"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <UserAvatar user={user} size="sm" />
              </Button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      My Profile
                    </div>
                  </Link>
                  
                  <Link href={{ pathname: '/profile', query: { tab: 'orders' } }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      My Orders
                    </div>
                  </Link>
                  
                  <Link href={{ pathname: '/profile', query: { tab: 'wishlist' } }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Wishlist
                    </div>
                  </Link>
                  
                  <Link href={{ pathname: '/profile', query: { tab: 'settings' } }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </div>
                  </Link>
                  
                  <div className="border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button size="sm">Sign in</Button>
            </Link>
          )}
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

      {/* Click outside to close dropdown */}
      {showProfileDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
    </header>
  )
}
