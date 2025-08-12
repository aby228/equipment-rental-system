'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  LogOut, 
  Heart, 
  Package,
  Settings
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  address: string
  avatar: string
}

interface Order {
  id: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: number
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<UserProfile | null>(null)

  // Mock user data
  const user: UserProfile = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    avatar: '/images/avatars/user.jpg'
  }

  // Mock orders
  const orders: Order[] = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 245.50,
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'processing',
      total: 89.99,
      items: 1
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'pending',
      total: 156.75,
      items: 2
    }
  ]

  const handleEdit = () => {
    setEditForm(user)
    setIsEditing(true)
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false)
    setEditForm(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditForm(null)
  }

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log('Logging out...')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Profile</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <Image
                    src={user.avatar}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={editForm?.name || ''}
                      onChange={(e) => setEditForm(prev => prev ? { ...prev, name: e.target.value } : null)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editForm?.email || ''}
                      onChange={(e) => setEditForm(prev => prev ? { ...prev, email: e.target.value } : null)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={editForm?.phone || ''}
                      onChange={(e) => setEditForm(prev => prev ? { ...prev, phone: e.target.value } : null)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={editForm?.address || ''}
                      onChange={(e) => setEditForm(prev => prev ? { ...prev, address: e.target.value } : null)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Order History</h3>
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4">
                        <span className="font-medium">Order #{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.items} item(s) • ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Your wishlist is empty</h3>
            <p className="mt-1 text-sm text-gray-500">Start adding items to your wishlist to see them here.</p>
            <div className="mt-6">
              <Button>
                Browse Products
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="text-center py-12">
            <Settings className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Settings</h3>
            <p className="mt-1 text-sm text-gray-500">Account settings and preferences will be available here.</p>
          </div>
        )}
      </Tabs>
    </div>
  )
} 