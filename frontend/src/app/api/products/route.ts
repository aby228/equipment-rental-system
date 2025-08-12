import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const products = await prisma.equipment.findMany({
         include: {
            // Equipment model doesn't have brand, categories, etc.
            // Include only the fields that exist
         },
      })

      return NextResponse.json(products)
   } catch (error) {
      console.error('[PRODUCT_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
