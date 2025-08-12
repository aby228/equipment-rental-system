"use client"

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchSuggestion {
  id: string
  name: string
  category?: string
  type: 'equipment' | 'category'
}

interface SearchAutocompleteProps {
  placeholder?: string
  suggestions: SearchSuggestion[]
  onSearch: (query: string) => void
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void
  className?: string
  showIcon?: boolean
}

export function SearchAutocomplete({
  placeholder = "Search equipment...",
  suggestions,
  onSearch,
  onSuggestionSelect,
  className,
  showIcon = true
}: SearchAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim()) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.name.toLowerCase().includes(query.toLowerCase()) ||
        (suggestion.category && suggestion.category.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8) // Limit to 8 suggestions
      setFilteredSuggestions(filtered)
      setIsOpen(filtered.length > 0)
      setSelectedIndex(-1)
    } else {
      setFilteredSuggestions([])
      setIsOpen(false)
    }
  }, [query, suggestions])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
          handleSuggestionSelect(filteredSuggestions[selectedIndex])
        } else if (query.trim()) {
          onSearch(query.trim())
          setIsOpen(false)
        }
        break
      case 'Escape':
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.name)
    setIsOpen(false)
    onSuggestionSelect?.(suggestion)
    onSearch(suggestion.name)
  }

  const clearSearch = () => {
    setQuery('')
    setIsOpen(false)
    onSearch('')
    inputRef.current?.focus()
  }

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div className="relative">
        {showIcon && (
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        )}
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && filteredSuggestions.length > 0 && setIsOpen(true)}
          className={cn(
            showIcon ? "pl-10" : "",
            query && "pr-10"
          )}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 transform"
            onClick={clearSearch}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {isOpen && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionSelect(suggestion)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors",
                index === selectedIndex && "bg-gray-50"
              )}
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900">{suggestion.name}</div>
                {suggestion.category && (
                  <div className="text-sm text-gray-500">{suggestion.category}</div>
                )}
              </div>
              <div className="text-xs text-gray-400 capitalize">
                {suggestion.type}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
