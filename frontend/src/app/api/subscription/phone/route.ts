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
            id: parseInt(userId),
         },
         data: {
            // Note: Customer model doesn't have isPhoneSubscribed field
            // You may need to add this field to the schema
         },
      })

      return NextResponse.json({
         phone: user.phone,
         // Note: isPhoneSubscribed field doesn't exist in Customer model
         // You may need to add this field to the schema
      })
   } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function DELETE(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const user = await prisma.customer.update({
         where: {
            id: parseInt(userId),
         },
         data: {
            // Note: Customer model doesn't have isPhoneSubscribed field
            // You may need to add this field to the schema
         },
      })

      return NextResponse.json({
         phone: user.phone,
      })
   } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      return new NextResponse('Internal error', { status: 500 })
   }
}
