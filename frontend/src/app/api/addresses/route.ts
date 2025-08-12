import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      // Address functionality not implemented in this equipment rental app
      return new Response('Address functionality not available', { status: 501 })

      // Address functionality not implemented
   } catch (error) {
      console.error('[ADDRESSES_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function POST(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const { address, city, phone, postalCode } = await req.json()

      // Address functionality not implemented in this equipment rental app
      return new Response('Address functionality not available', { status: 501 })
   } catch (error) {
      console.error('[ADDRESS_POST]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
