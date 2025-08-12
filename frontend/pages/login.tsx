"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { getGoogleURL } from "@/lib/google"
import { getFacebookURL } from "@/lib/facebook"
import { getAppleURL } from "@/lib/apple"

export default function LoginPage() {
  const handleOAuth = (provider: "google" | "facebook" | "apple") => {
    const url =
      provider === "google"
        ? getGoogleURL()
        : provider === "facebook"
        ? getFacebookURL()
        : getAppleURL()
    if (!url) return
    window.location.href = url
  }

  return (
    <div className={cn("flex flex-col gap-6 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8")}> 
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-display font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">Login to your EDUSTECH ENTERPRISE account</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
                <div className="flex">
                  <Link href="/forgot-password" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full"> Login </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button type="button" variant="outline" className="w-full" onClick={() => handleOAuth("apple")}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="currentColor" />
                  </svg>
                  <span className="sr-only">Login with Apple</span>
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => handleOAuth("google")}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => handleOAuth("facebook")}> 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M22 12a10 10 0 10-11.563 9.875v-6.985H7.898V12h2.539V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.773-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.985A10.001 10.001 0 0022 12z" fill="currentColor" />
                  </svg>
                  <span className="sr-only">Login with Facebook</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
              <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.
              </div>
            </div>
          </form>
          <div className="relative hidden min-h-[540px] bg-muted md:block">
            <Image src="/images/banners/Banner.295Z.png" alt="EDUSTECH ENTERPRISE banner" fill className="absolute inset-0 h-full w-full object-cover" priority />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 