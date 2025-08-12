import { useState } from 'react'
import { Heading } from '@/components/native/heading'
import { Separator } from '@/components/native/separator'
import ProductGrid from '@/components/native/ProductGrid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SearchAutocomplete } from '@/components/ui/search-autocomplete'
import { 
  Filter, 
  Grid3X3, 
  List, 
  ChevronDown,
  ShoppingCart,
  Zap,
  Droplets,
  Wrench,
  Shovel,
  Truck,
  Lightbulb,
  Scissors,
  CircleDot,
  Gauge
} from 'lucide-react'
import config from '@/config/site'

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

// Category definitions with icons and colors
const categories = [
  {
    id: 'all',
    name: 'All Equipment',
    icon: null,
    color: 'bg-gradient-to-br from-blue-500 to-purple-600',
    description: 'All construction equipment',
    count: 24
  },
  {
    id: 'power-generation',
    name: 'Power Generation',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    description: 'Generators and power equipment',
    count: 3
  },
  {
    id: 'pumps',
    name: 'Pumps & Water',
    icon: Droplets,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Water pumps and fluid handling',
    count: 3
  },
  {
    id: 'tools',
    name: 'Hand Tools',
    icon: Wrench,
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'Professional hand tools',
    count: 2
  },
  {
    id: 'excavation',
    name: 'Excavation',
    icon: Shovel,
    color: 'bg-brown-100 text-brown-800 border-brown-200',
    description: 'Digging and excavation tools',
    count: 3
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: Truck,
    color: 'bg-green-100 text-green-800 border-green-200',
    description: 'Wheelbarrows and transport equipment',
    count: 2
  },
  {
    id: 'lighting',
    name: 'Lighting',
    icon: Lightbulb,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Lighting and illumination',
    count: 1
  },
  {
    id: 'landscaping',
    name: 'Landscaping',
    icon: Scissors,
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Lawn care and landscaping',
    count: 2
  },
  {
    id: 'concrete',
    name: 'Concrete',
    icon: CircleDot,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    description: 'Concrete mixing and finishing',
    count: 5
  },
  {
    id: 'access',
    name: 'Access Equipment',
    icon: Gauge,
    color: 'bg-red-100 text-red-800 border-red-200',
    description: 'Lifts and access platforms',
    count: 2
  }
]

// Construction Equipment Data with categories
const equipmentProducts = [
  {
    id: '1',
    name: 'Welder Generator',
    description: 'Portable welding generator for construction sites. Provides both welding power and electrical generation capabilities.',
    price: 45.00,
    image: '/images/equipment/welder generator.jpg',
    inStock: true,
    category: 'power-generation'
  },
  {
    id: '2',
    name: 'Heavy-Duty Grout Pump',
    description: 'Professional grout pump for concrete and masonry work. High-pressure delivery system.',
    price: 35.00,
    image: '/images/equipment/HEAVY-DUTY GROUT PUMP.jpg',
    inStock: true,
    category: 'pumps'
  },
  {
    id: '3',
    name: 'Tube and Clamp Scaffold System',
    description: 'Modular scaffolding system for construction and maintenance work. Adjustable height and configuration.',
    price: 25.00,
    image: '/images/equipment/Tube and Clamp Scaffold System.jpg',
    inStock: true,
    category: 'access'
  },
  {
    id: '4',
    name: 'AMT Self-Priming Sewage Trash Pump',
    description: 'Heavy-duty pump for sewage and waste water removal. Self-priming design for easy operation.',
    price: 40.00,
    image: '/images/equipment/AMT Self-Priming Sewage Trash Pump.jpg',
    inStock: true,
    category: 'pumps'
  },
  {
    id: '5',
    name: 'Electric Auxiliary Water Pump',
    description: 'Electric water pump for irrigation and drainage applications. Quiet and efficient operation.',
    price: 20.00,
    image: '/images/equipment/Electric Auxiliary Water Pump.jpg',
    inStock: true,
    category: 'pumps'
  },
  {
    id: '6',
    name: 'High Torque Impact Wrench',
    description: 'Professional impact wrench for heavy-duty fastening applications. High torque output for construction use.',
    price: 15.00,
    image: '/images/equipment/High Torque Impact Wrench.jpg',
    inStock: true,
    category: 'tools'
  },
  {
    id: '7',
    name: 'Torque-Impact Wrench',
    description: 'Precision torque impact wrench for controlled fastening. Ideal for critical applications.',
    price: 18.00,
    image: '/images/equipment/Torque-Impact Wrench.jpg',
    inStock: true,
    category: 'tools'
  },
  {
    id: '8',
    name: 'Stainless Digging Spade',
    description: 'Professional stainless steel digging spade for landscaping and construction work.',
    price: 8.00,
    image: '/images/equipment/Stainless Digging Spade.jpg',
    inStock: true,
    category: 'excavation'
  },
  {
    id: '9',
    name: 'Shovel with Axe Edge',
    description: 'Multi-purpose shovel with axe edge for cutting roots and digging in tough soil conditions.',
    price: 10.00,
    image: '/images/equipment/Shovel with Axe Edge.jpg',
    inStock: true,
    category: 'excavation'
  },
  {
    id: '10',
    name: '27" Light Strong Small Spade Shovel',
    description: 'Compact spade shovel perfect for gardening and small excavation projects.',
    price: 6.00,
    image: '/images/equipment/27 Inch Light Strong Small Spade Shovel Mini Kid Gardening Shovel.jpg',
    inStock: true,
    category: 'excavation'
  },
  {
    id: '11',
    name: 'Trolley Wheelbarrow',
    description: 'Heavy-duty wheelbarrow with trolley design for easy material transport on construction sites.',
    price: 12.00,
    image: '/images/equipment/TROLLEY-WHEELBARROW.jpg',
    inStock: true,
    category: 'transport'
  },
  {
    id: '12',
    name: 'Heavy-Duty 8 cu ft Poly Wheelbarrow',
    description: 'Large capacity poly wheelbarrow for heavy material transport. Durable construction for demanding work.',
    price: 15.00,
    image: '/images/equipment/Heavy-Duty, 8 cu ft, Poly Wheelbarrow.jpg',
    inStock: true,
    category: 'transport'
  },
  {
    id: '13',
    name: 'Portable Light Tower',
    description: 'Mobile lighting tower for construction sites and outdoor events. Provides powerful illumination.',
    price: 55.00,
    image: '/images/equipment/Portable Light Tower.png',
    inStock: true,
    category: 'lighting'
  },
  {
    id: '14',
    name: 'Self-Propelled Petrol Lawn Mower',
    description: 'Professional self-propelled lawn mower for large area maintenance. Petrol powered for extended use.',
    price: 30.00,
    image: '/images/equipment/self-propelled-petrol-lawnmower.jpg',
    inStock: true,
    category: 'landscaping'
  },
  {
    id: '15',
    name: 'Gas Push Lawn Mower',
    description: 'Reliable gas-powered push mower for residential and commercial lawn maintenance.',
    price: 18.00,
    image: '/images/equipment/Gas Push Lawn Mower.jpg',
    inStock: true,
    category: 'landscaping'
  },
  {
    id: '16',
    name: 'Stainless Steel Cement Edger',
    description: 'Professional cement edger for creating clean edges on concrete surfaces.',
    price: 12.00,
    image: '/images/equipment/Stainless Steel Cement Edger.jpeg',
    inStock: true,
    category: 'concrete'
  },
  {
    id: '17',
    name: '8" x 3" Finishing Trowel',
    description: 'Professional finishing trowel for concrete surface finishing. Square soft handle for comfort.',
    price: 8.00,
    image: '/images/equipment/8-x-3-finishing-trowel-square-soft-handle.jpg',
    inStock: true,
    category: 'concrete'
  },
  {
    id: '18',
    name: 'WL12000HE-03-A Portable Generator',
    description: 'High-capacity portable generator for construction sites and emergency power needs.',
    price: 75.00,
    image: '/images/equipment/WL12000HE-03-A Portable Generator.jpg',
    inStock: true,
    category: 'power-generation'
  },
  {
    id: '19',
    name: 'Cummins Diesel Generator',
    description: 'Industrial-grade diesel generator for heavy-duty power requirements on construction sites.',
    price: 120.00,
    image: '/images/equipment/Cummins-Diesel-Generators.png',
    inStock: true,
    category: 'power-generation'
  },
  {
    id: '20',
    name: '5-Axle Concrete Mixer',
    description: 'Large capacity concrete mixer for commercial construction projects. 5-axle design for stability.',
    price: 95.00,
    image: '/images/equipment/5-Axle Concrete Mixer.jpg',
    inStock: true,
    category: 'concrete'
  },
  {
    id: '21',
    name: 'Transit Concrete Mixer',
    description: 'Mobile concrete mixer for on-site concrete production and delivery.',
    price: 85.00,
    image: '/images/equipment/transit-concrete-mixer.jpg',
    inStock: true,
    category: 'concrete'
  },
  {
    id: '22',
    name: 'Concrete Mixer 1.5HP Electric 120V',
    description: 'Electric concrete mixer for small to medium projects. 1.5HP motor, 120V operation.',
    price: 25.00,
    image: '/images/equipment/Concrete Mixer 1.5HP Elecric 120V.jpg',
    inStock: true,
    category: 'concrete'
  },
  {
    id: '23',
    name: 'Scissor Lift',
    description: 'Versatile scissor lift for elevated work applications. Safe and stable platform for construction tasks.',
    price: 65.00,
    image: '/images/equipment/Scissor Lift.jpg',
    inStock: true,
    category: 'access'
  },
  {
    id: '24',
    name: 'Aerial Lifts',
    description: 'Professional aerial lifts for high-level construction and maintenance work. Multiple configurations available.',
    price: 80.00,
    image: '/images/equipment/Aerial Lifts.jpg',
    inStock: true,
    category: 'access'
  }
]

const brands = ['All', 'AMT', 'Cummins', 'WL', 'Professional', 'Heavy-Duty']

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')
  const [priceRange, setPriceRange] = useState([0, 200])
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)

  // Filter products based on search, brand, and category
  const filteredProducts = equipmentProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = selectedBrand === 'All' || product.name.includes(selectedBrand)
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    
    return matchesSearch && matchesBrand && matchesCategory
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return a.name.localeCompare(b.name)
    }
  })

  // Get current category
  const currentCategory = categories.find(cat => cat.id === selectedCategory)

  const handleSearch = (query: string) => {
    setSearchTerm(query)
  }

  const handleSuggestionSelect = (suggestion: any) => {
    setSearchTerm(suggestion.name)
    // If it's a category suggestion, also set the category filter
    if (suggestion.type === 'category') {
      const categoryId = categories.find(cat => 
        cat.name.toLowerCase() === suggestion.name.toLowerCase()
      )?.id
      if (categoryId) {
        setSelectedCategory(categoryId)
      }
    }
  }

  return (
    <div className="space-y-8">
      <Heading
        title={`${config.name} - ${config.subtitle}`}
        description="Browse our complete collection of professional construction equipment available for hourly rental."
      />
      
      {/* Filters and Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <SearchAutocomplete
              placeholder="Search equipment..."
              suggestions={equipmentSuggestions}
              onSearch={handleSearch}
              onSuggestionSelect={handleSuggestionSelect}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Category Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="flex items-center gap-2 min-w-[200px] justify-between"
            >
              <div className="flex items-center gap-2">
                {currentCategory?.icon && (
                  <div className={`w-6 h-6 ${currentCategory.color} rounded flex items-center justify-center`}>
                    <currentCategory.icon className="w-3 h-3" />
                  </div>
                )}
                <span>{currentCategory?.name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
            </Button>
            
            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setIsCategoryDropdownOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        selectedCategory === category.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 ${category.color} rounded flex items-center justify-center`}>
                        {IconComponent ? (
                          <IconComponent className="w-4 h-4" />
                        ) : (
                          <span className="text-white font-bold text-sm">All</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-500">{category.description}</div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Brand Filters */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Brand:</span>
            {brands.map((brand) => (
              <Badge
                key={brand}
                variant={selectedBrand === brand ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </Badge>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="name">Name: A to Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {sortedProducts.length} of {equipmentProducts.length} equipment items
          {selectedCategory !== 'all' && (
            <span className="ml-2">
              in <span className="font-medium">{currentCategory?.name}</span>
            </span>
          )}
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ShoppingCart className="w-4 h-4" />
          <span>Cart (0)</span>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid 
        products={sortedProducts}
        showFilters={false}
      />
    </div>
  )
} 