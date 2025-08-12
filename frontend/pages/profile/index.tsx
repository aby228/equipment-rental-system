'use client'

import { useState, useRef, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserAvatar } from '@/components/ui/user-avatar'
import { useAuth } from '@/hooks/useAuth'
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
  Settings,
  Camera,
  Upload,
  Calendar,
  CreditCard,
  Shield,
  Bell
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  avatar?: string
  joinDate?: string
}

interface Order {
  id: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: number
}

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<UserProfile | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { user: authUser, logout, isLoggedIn } = useAuth()

  // Sync tab with URL (e.g. /profile?tab=orders)
  useEffect(() => {
    const queryTab = typeof router.query?.tab === 'string' ? router.query.tab : undefined
    if (queryTab && queryTab !== activeTab) {
      setActiveTab(queryTab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query?.tab])

  // Use authenticated user data (with safe fallbacks)
  const user: UserProfile = useMemo(() => ({
    id: authUser?.id || '1',
    name: authUser?.name || 'User',
    email: authUser?.email || 'user@example.com',
    phone: authUser?.phone || '',
    address: '',
    avatar: authUser?.avatar,
    joinDate: new Date().toISOString(),
  }), [authUser])

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
    // Persist profile changes locally so navbar/avatar update immediately
    const next = {
      id: user.id,
      name: editForm?.name || user.name,
      email: editForm?.email || user.email,
      phone: editForm?.phone || user.phone,
      avatar: avatarPreview || user.avatar,
      address: editForm?.address || user.address,
      joinDate: user.joinDate,
    }
    try {
      localStorage.setItem('user', JSON.stringify(next))
      window.dispatchEvent(new CustomEvent('userLogin'))
    } catch {}
    setIsEditing(false)
    setEditForm(null)
    setAvatarPreview(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditForm(null)
    setAvatarPreview(null)
  }

  const handleLogout = () => {
    logout()
    // Redirect to home page
    window.location.href = '/'
  }

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
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



  if (!isLoggedIn || !authUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Card className="shadow-sm">
            <CardContent className="p-8 text-center space-y-4">
              <User className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="text-xl font-semibold">You are not signed in</h2>
              <p className="text-sm text-gray-600">Please log in to view and manage your profile.</p>
              <Link href="/login">
                <Button className="mt-2">Go to Login</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">My Profile</h1>
              <p className="mt-1 text-sm text-gray-600">Manage your account settings and preferences</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div 
                      className={`cursor-pointer ${
                        isEditing ? 'hover:opacity-80 transition-opacity' : ''
                      }`}
                      onClick={handleAvatarClick}
                    >
                      {avatarPreview ? (
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                          <Image
                            src={avatarPreview}
                            alt="Profile"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <UserAvatar user={user} size="xl" className="border-4 border-white shadow-lg" />
                      )}
                    </div>
                    {isEditing && (
                      <div className="absolute -bottom-2 -right-2">
                        <Button
                          size="sm"
                          className="rounded-full w-8 h-8 p-0 bg-blue-600 hover:bg-blue-700"
                          onClick={handleAvatarClick}
                        >
                          <Camera className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <h2 className="mt-4 text-xl font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <div className="mt-2 flex items-center justify-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    Member since {new Date(user.joinDate || new Date().toISOString()).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={(val) => {
                setActiveTab(val)
                const url = { pathname: '/profile', query: val === 'profile' ? {} : { tab: val } }
                router.push(url as any, undefined, { shallow: true })
              }}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm sticky top-0 z-10">
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
                <Card className="shadow-sm border-t">
                  <CardHeader className="border-b bg-gray-50/80 backdrop-blur supports-[backdrop-filter]:bg-gray-50/60">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-600" />
                        Personal Information
                      </CardTitle>
                      {!isEditing ? (
                        <Button variant="outline" size="sm" onClick={handleEdit} className="gap-2">
                          <Edit className="w-4 h-4" />
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSave} className="gap-2">
                            <Save className="w-4 h-4" />
                            Save Changes
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleCancel} className="gap-2">
                            <X className="w-4 h-4" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={editForm?.name || user.name}
                          onChange={(e) => setEditForm(prev => prev ? { ...prev, name: e.target.value } : { ...user, name: e.target.value })}
                          disabled={!isEditing}
                          className="bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={editForm?.email || user.email}
                          onChange={(e) => setEditForm(prev => prev ? { ...prev, email: e.target.value } : { ...user, email: e.target.value })}
                          disabled={!isEditing}
                          className="bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={editForm?.phone || user.phone || ''}
                          onChange={(e) => setEditForm(prev => prev ? { ...prev, phone: e.target.value } : { ...user, phone: e.target.value })}
                          disabled={!isEditing}
                          className="bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                          Address
                        </Label>
                        <Input
                          id="address"
                          value={editForm?.address || user.address || ''}
                          onChange={(e) => setEditForm(prev => prev ? { ...prev, address: e.target.value } : { ...user, address: e.target.value })}
                          disabled={!isEditing}
                          className="bg-white"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <Card className="shadow-sm">
                  <CardHeader className="border-b bg-gray-50/50">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-gray-600" />
                      Order History
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-4">
                              <span className="font-semibold text-gray-900">Order #{order.id}</span>
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
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist" className="space-y-6">
                <Card className="shadow-sm">
                  <CardContent className="p-12 text-center">
                    <Heart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                    <p className="mt-2 text-sm text-gray-500">Start adding items to your wishlist to see them here.</p>
                    <div className="mt-6">
                      <Link href="/products">
                        <Button className="gap-2">
                          <Package className="w-4 h-4" />
                          Browse Products
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-gray-600" />
                        Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Manage your notification preferences.</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-gray-600" />
                        Privacy & Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Control your privacy and security settings.</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        Payment Methods
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Manage your payment methods and billing.</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5 text-gray-600" />
                        Account Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">General account settings and preferences.</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
} 