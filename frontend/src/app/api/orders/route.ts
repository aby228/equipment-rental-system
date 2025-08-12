import config from '@/config/site'
import Mail from '@/emails/order_notification_owner'
import prisma from '@/lib/prisma'
// Email sending functionality - replace with your preferred email service
import { render } from '@react-email/render'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const orders = await prisma.order.findMany({
         where: {
            customerId: parseInt(userId),
         },
         include: {
            customer: true,
            orderItems: {
               include: {
                  equipment: true,
               },
            },
         },
      })

      return NextResponse.json(orders)
   } catch (error) {
      console.error('[ORDERS_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function POST(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const { addressId, discountCode } = await req.json()

      if (discountCode) {
         // Discount code functionality not implemented in this equipment rental app
         // You may need to implement discount codes differently
         console.log('Discount code would be applied:', discountCode)
      }

      // Cart functionality not implemented in this equipment rental app
      // You may need to implement cart storage differently
      console.log('Cart would be retrieved for user:', userId)

      // Placeholder cart data for cost calculation
      const cart: { items: Array<{ count: number; productId: number; product?: { dailyRate?: number } }> } = { items: [] }
      const { tax, total, discount, payable } = calculateCosts({ cart })

      const order = await prisma.order.create({
         data: {
            customerId: parseInt(userId),
            orderItems: {
               create: cart?.items.map((orderItem) => ({
                  quantity: orderItem.count,
                  dailyRate: orderItem.product?.dailyRate || 0,
                  equipmentId: orderItem.productId,
               })) || [],
            },
         },
      })

      // Owner functionality not implemented in this equipment rental app
      // You may need to implement owner notifications differently
      console.log('Owner notifications would be sent for order:', order.id)

      return NextResponse.json(order)
   } catch (error) {
      console.error('[ORDER_POST]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

interface CartItem {
   count: number;
   productId: number;
   product?: {
      dailyRate?: number;
      discount?: number;
   };
}

interface Cart {
   items: CartItem[];
}

function calculateCosts({ cart }: { cart: Cart }) {
   let total = 0,
      discount = 0

   for (const item of cart?.items) {
      total += item?.count * (item?.product?.dailyRate || 0)
      discount += item?.count * (item?.product?.discount || 0)
   }

   const afterDiscount = total - discount
   const tax = afterDiscount * 0.09
   const payable = afterDiscount + tax

   return {
      total: parseFloat(total.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      afterDiscount: parseFloat(afterDiscount.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      payable: parseFloat(payable.toFixed(2)),
   }
}
