import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const user = await prisma.customer.update({
         where: {
            // Note: Customer model doesn't have emailUnsubscribeToken field
            // You may need to add this field to the schema
            id: 1, // Placeholder - replace with actual logic
         },
         data: {
            // Note: Customer model doesn't have isEmailSubscribed field
            // You may need to add this field to the schema
         },
      })

      return NextResponse.json({
         email: user.email,
         // Note: isEmailSubscribed field doesn't exist in Customer model
         // You may need to add this field to the schema
      })
   } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function DELETE(req: Request) {
   try {
      const { emailUnsubscribeToken } = await req.json()

      const user = await prisma.customer.update({
         where: {
            // Note: Customer model doesn't have emailUnsubscribeToken field
            // You may need to add this field to the schema
            id: 1, // Placeholder - replace with actual logic
         },
         data: {
            // Note: Customer model doesn't have isEmailSubscribed field
            // You may need to add this field to the schema
         },
      })

      return NextResponse.json({
         email: user.email,
         // Note: isEmailSubscribed field doesn't exist in Customer model
         // You may need to add this field to the schema
      })
   } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      return new NextResponse('Internal error', { status: 500 })
   }
}
