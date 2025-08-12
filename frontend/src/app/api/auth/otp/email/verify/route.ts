import { signJWT } from '@/lib/jwt'
import prisma from '@/lib/prisma'
import { getErrorResponse } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function POST(req: NextRequest) {
   try {
      const expiryMinutes = 30 * 24 * 60
      const tokenMaxAge = expiryMinutes * 60

      const { email, OTP, cart } = await req.json()

      // Note: Customer model doesn't have OTP or isEmailVerified fields
      // You may need to add these fields to the schema or implement verification differently
      const user = await prisma.customer.findUnique({
         where: { email: email.toString().toLowerCase() },
      })

      if (!user) {
         return getErrorResponse(400, 'Invalid email or OTP')
      }

      if (cart?.items?.length > 0) {
         // Cart functionality not implemented in this equipment rental app
         // You may need to implement cart storage differently
         console.log('Cart items would be saved:', cart.items)
      }

      const token = await signJWT(
         { sub: user.id.toString() },
         { exp: `${expiryMinutes}m` }
      )

      const cookieOptions = {
         name: 'token',
         value: token,
         httpOnly: true,
         path: '/',
         secure: process.env.NODE_ENV !== 'development',
         maxAge: tokenMaxAge,
      }

      const response = new NextResponse(
         JSON.stringify({
            status: 'success',
            token,
         }),
         {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
         }
      )

      await Promise.all([
         response.cookies.set(cookieOptions),
         response.cookies.set({
            name: 'logged-in',
            value: 'true',
            maxAge: tokenMaxAge,
         }),
      ])

      return response
   } catch (error: any) {
      if (error instanceof ZodError) {
         return getErrorResponse(400, 'failed validations', error)
      }

      return getErrorResponse(500, error.message)
   }
}
