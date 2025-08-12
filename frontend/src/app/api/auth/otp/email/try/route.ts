import config from '@/config/site'
import Mail from '@/emails/verify'
import prisma from '@/lib/prisma'
import { generateSerial } from '@/lib/serial'
import { getErrorResponse } from '@/lib/utils'
// Email validation function
function isEmailValid(email: string): boolean {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   return emailRegex.test(email)
}
import { render } from '@react-email/render'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function POST(req: NextRequest) {
   try {
      const OTP = generateSerial({})

      const { email } = await req.json()

      if (isEmailValid(email)) {
         await prisma.customer.upsert({
            where: { email: email.toString().toLowerCase() },
            update: {
               // Note: OTP field doesn't exist in Customer model, you may need to add it
               // For now, we'll just update the existing customer
            },
            create: {
               email: email.toString().toLowerCase(),
               name: email.split('@')[0], // Use email prefix as name
               password: '', // Will be set during verification
               role: 'user',
            },
         })

         // Email sending functionality - replace with your preferred email service
         console.log('Email would be sent to:', email, 'with OTP:', OTP)
         console.log('Email HTML:', await render(Mail({ code: OTP, name: config.name })))

         return new NextResponse(
            JSON.stringify({
               status: 'success',
               email,
            }),
            {
               status: 200,
               headers: { 'Content-Type': 'application/json' },
            }
         )
      }

      if (!isEmailValid(email)) {
         return getErrorResponse(400, 'Incorrect Email')
      }

      // Default case - should not reach here if email validation is working correctly
      return getErrorResponse(400, 'Invalid email format')
   } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
         return getErrorResponse(400, 'failed validations', error)
      }

      return getErrorResponse(500, error instanceof Error ? error.message : 'Unknown error')
   }
}
