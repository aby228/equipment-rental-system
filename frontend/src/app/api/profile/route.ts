import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const user = await prisma.customer.findUniqueOrThrow({
         where: { id: parseInt(userId) },
         include: {
            // Customer model doesn't have cart, addresses, etc.
            // Include only the fields that exist
         },
      })

      return NextResponse.json({
         id: user.id,
         email: user.email,
         name: user.name,
         phone: user.phone,
         role: user.role,
         // Note: birthday, addresses, wishlist, cart fields don't exist in Customer model
      })
   } catch (error) {
      console.error('[PROFILE_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
