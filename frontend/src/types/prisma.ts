import { Prisma } from '@prisma/client'

export type OrderItemWithEquipment = Prisma.OrderItemGetPayload<{
   include: {
      equipment: true;
   };
}>

export type EquipmentWithIncludes = Prisma.EquipmentGetPayload<{
   include: {
      // No includes needed since Equipment is a simple model
   };
}>

export type CustomerWithIncludes = Prisma.CustomerGetPayload<{
   include: {
      orders: {
         include: {
            orderItems: {
               include: {
                  equipment: true
               }
            }
         }
      }
      rentals: true
   }
}>

export type OrderWithIncludes = Prisma.OrderGetPayload<{
   include: {
      customer: {
         include: {
            orders: true
            rentals: true
         }
      }
      orderItems: {
         include: {
            equipment: true
         }
      }
   }
}>
