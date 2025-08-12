import prisma from '@/lib/prisma'
import { generateSerial } from '@/lib/serial'
import { getErrorResponse } from '@/lib/utils'
// Phone validation function
function isIranianPhoneNumberValid(phone: string): boolean {
   const phoneRegex = /^(\+98|0)?9\d{9}$/
   return phoneRegex.test(phone)
}
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function POST(req: NextRequest) {
   try {
      const OTP = generateSerial({})

      const { phone } = await req.json()

      // Use isPhoneNumberValid if international
      if (isIranianPhoneNumberValid(phone)) {
         // Check if customer exists with this phone number
         const existingCustomer = await prisma.customer.findFirst({
            where: { phone: phone.toString().toLowerCase() },
         })

         if (existingCustomer) {
            // Update existing customer (OTP functionality would be added here)
            console.log('Customer exists, would update OTP')
         } else {
            // Create new customer
            await prisma.customer.create({
               data: {
                  phone: phone.toString().toLowerCase(),
                  email: '', // Will be set later
                  name: 'User', // Default name
                  password: '', // Will be set during verification
                  role: 'user',
               },
            })
         }

         // SMS sending functionality - replace with your preferred SMS service
         console.log('SMS would be sent to:', phone, 'with OTP:', OTP)

         return new NextResponse(
            JSON.stringify({
               status: 'success',
               phone,
            }),
            {
               status: 200,
               headers: { 'Content-Type': 'application/json' },
            }
         )
      }

      if (!isIranianPhoneNumberValid(phone)) {
         return getErrorResponse(400, 'Incorrect Phone Number')
      }

      // Default case - should not reach here if phone validation is working correctly
      return getErrorResponse(400, 'Invalid phone format')
   } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
         return getErrorResponse(400, 'failed validations', error)
      }

      return getErrorResponse(500, error instanceof Error ? error.message : 'Unknown error')
   }
}
