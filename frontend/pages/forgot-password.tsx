"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!email) {
      setError("Please enter your email address")
      setIsLoading(false)
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    try {
      // TODO: Implement actual password reset email sending
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess(true)
    } catch (err) {
      setError("Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className={cn("flex flex-col gap-6 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8")}>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-display font-bold">Check your email</h1>
                  <p className="text-balance text-muted-foreground mt-2">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Didn't receive the email?</strong> Check your spam folder or{" "}
                    <button
                      onClick={() => setSuccess(false)}
                      className="underline hover:text-blue-600"
                    >
                      try again with a different email address
                    </button>
                  </p>
                </div>

                <div className="text-center">
                  <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to login
                  </Link>
                </div>
              </div>
            </div>
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
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8")}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-display font-bold">Forgot your password?</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError("")
                  }}
                  required
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <div className="text-center">
                <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to login
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
    </div>
  )
}
