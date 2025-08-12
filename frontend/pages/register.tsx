"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  })
  const router = useRouter()

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    let score = 0
    let feedback = []

    if (password.length >= 8) score++
    else feedback.push("At least 8 characters")

    if (/[a-z]/.test(password)) score++
    else feedback.push("At least one lowercase letter")

    if (/[A-Z]/.test(password)) score++
    else feedback.push("At least one uppercase letter")

    if (/[0-9]/.test(password)) score++
    else feedback.push("At least one number")

    if (/[^A-Za-z0-9]/.test(password)) score++
    else feedback.push("At least one special character")

    return {
      score,
      feedback: feedback.join(", "),
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (field === "password") {
      setPasswordStrength(checkPasswordStrength(value))
    }
    
    if (error) setError("")
  }

  const getPasswordStrengthColor = (score: number) => {
    if (score <= 2) return "text-red-500"
    if (score <= 3) return "text-yellow-500"
    if (score <= 4) return "text-blue-500"
    return "text-green-500"
  }

  const getPasswordStrengthText = (score: number) => {
    if (score <= 2) return "Weak"
    if (score <= 3) return "Fair"
    if (score <= 4) return "Good"
    return "Strong"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (passwordStrength.score < 4) {
      setError("Password is not strong enough")
      setIsLoading(false)
      return
    }

    try {
      // TODO: Implement actual registration
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, store user data
      localStorage.setItem("user", JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }))
      
      router.push("/profile")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8")}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-display font-bold">Create an account</h1>
                <p className="text-balance text-muted-foreground">Join EDUSTECH ENTERPRISE today</p>
              </div>

              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="text-xs">
                    <span className={getPasswordStrengthColor(passwordStrength.score)}>
                      Password strength: {getPasswordStrengthText(passwordStrength.score)}
                    </span>
                    {passwordStrength.feedback && (
                      <p className="text-gray-500 mt-1">{passwordStrength.feedback}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden min-h-[540px] bg-muted md:block">
            <Image
              src="/images/banners/Banner.295Z.png"
              alt="EDUSTECH ENTERPRISE banner"
              fill
              className="absolute inset-0 h-full w-full object-cover"
              priority
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By creating an account, you agree to our <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  )
}
