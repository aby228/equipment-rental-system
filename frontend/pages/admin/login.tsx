import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement admin authentication
    console.log('Admin login:', { email, password })
  }

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>
      
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Store</span>
              </Link>
              <div className="flex items-center space-x-2 text-white">
                <Image
                  src="/logo.png"
                  alt="EDUSTECH ENTERPRISE Logo"
                  width={24}
                  height={24}
                  className="rounded-md"
                />
                <span className="text-sm font-medium">EDUSTECH ENTERPRISE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:px-8">
          <div className="w-full max-w-md">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-8 pt-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-white font-bold text-2xl">A</span>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-3">Admin Login</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Access your equipment rental dashboard
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 h-14 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-12 h-14 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-200"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="remember"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <Label htmlFor="remember" className="text-sm text-gray-600 font-medium">
                        Remember me
                      </Label>
                    </div>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      Forgot password?
                    </a>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-base font-semibold shadow-lg rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Sign In
                  </Button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                      Contact support
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-white/80 text-sm">
                © 2025 EDUSTECH ENTERPRISE. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 