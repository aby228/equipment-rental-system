import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Package, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Settings,
  Plus,
  Search,
  Filter,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const stats = [
    { title: 'Total Equipment', value: '24', icon: Package, change: '+12%', color: 'text-blue-600' },
    { title: 'Active Rentals', value: '8', icon: Calendar, change: '+5%', color: 'text-green-600' },
    { title: 'Total Customers', value: '156', icon: Users, change: '+23%', color: 'text-purple-600' },
    { title: 'Revenue', value: '$12,450', icon: DollarSign, change: '+18%', color: 'text-orange-600' },
  ]

  const recentRentals = [
    { id: 1, customer: 'John Doe', equipment: 'Excavator CAT320', status: 'Active', amount: '$2,500' },
    { id: 2, customer: 'Jane Smith', equipment: 'Bulldozer D6T', status: 'Pending', amount: '$1,800' },
    { id: 3, customer: 'Mike Johnson', equipment: 'Crane RT550', status: 'Completed', amount: '$3,200' },
  ]

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background-color: #f8fafc;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="EDUSTECH ENTERPRISE Logo"
                  width={32}
                  height={32}
                  className="rounded-md mr-3"
                />
                <h1 className="text-xl font-semibold text-gray-900">EDUSTECH ENTERPRISE Admin</h1>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Equipment
                </Button>
                <Button variant="ghost" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button size="sm" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Equipment
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{stat.value}</p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="p-2 sm:p-3 rounded-full bg-gray-100">
                        <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mt-3 sm:mt-4">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">{stat.change}</span>
                    <span className="text-sm text-gray-500 ml-1 hidden sm:inline">from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border mb-6 sm:mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 overflow-x-auto">
                {['overview', 'equipment', 'rentals', 'customers'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-4 sm:p-6">
              {activeTab === 'overview' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <h3 className="text-lg font-medium text-gray-900">Recent Rentals</h3>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                  
                  <div className="bg-white rounded-lg border">
                    <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <h4 className="text-sm font-medium text-gray-900">Recent Activity</h4>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                          <div className="relative flex-1 sm:flex-none">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search rentals..."
                              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                      {recentRentals.map((rental) => (
                        <div key={rental.id} className="px-4 sm:px-6 py-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <Package className="w-5 h-5 text-blue-600" />
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 truncate">{rental.customer}</p>
                                <p className="text-sm text-gray-500 truncate">{rental.equipment}</p>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                              <Badge 
                                variant={rental.status === 'Active' ? 'default' : rental.status === 'Pending' ? 'secondary' : 'outline'}
                                className="w-fit"
                              >
                                {rental.status}
                              </Badge>
                              <span className="text-sm font-medium text-gray-900">{rental.amount}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'equipment' && (
                <div className="text-center py-8 sm:py-12">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Equipment Management</h3>
                  <p className="mt-1 text-sm text-gray-500">Manage your equipment inventory here.</p>
                  <div className="mt-6">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Equipment
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'rentals' && (
                <div className="text-center py-8 sm:py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Rental Management</h3>
                  <p className="mt-1 text-sm text-gray-500">View and manage all rental transactions.</p>
                </div>
              )}

              {activeTab === 'customers' && (
                <div className="text-center py-8 sm:py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Customer Management</h3>
                  <p className="mt-1 text-sm text-gray-500">Manage your customer database here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 