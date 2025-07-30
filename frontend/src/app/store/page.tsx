import {
   BlogPostCard,
   BlogPostGrid,
   BlogPostSkeletonGrid,
} from '@/components/native/BlogCard'
import Carousel from '@/components/native/Carousel'
import { ProductGrid, ProductSkeletonGrid } from '@/components/native/Product'
import { Heading } from '@/components/native/heading'
import { Separator } from '@/components/native/separator'
import prisma from '@/lib/prisma'
import { isVariableValid } from '@/lib/utils'

export default async function StorePage() {
   const equipment = await prisma.equipment.findMany()

   // For now, we'll use a simple carousel with placeholder images
   const banners = [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop'
   ]

   return (
      <div className="flex flex-col border-neutral-200 dark:border-neutral-700">
         <Carousel images={banners} />
         <Separator className="my-8" />
         <Heading
            title="Equipment for Rent"
            description="Browse our available equipment for rental."
         />
         {isVariableValid(equipment) && equipment.length > 0 ? (
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
               {equipment.map((item) => (
                  <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                     <div className="p-4">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                           <p className="font-bold">${item.dailyRate}/day</p>
                           <p className="text-sm text-gray-600">{item.quantity} available</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            <ProductSkeletonGrid />
         )}
      </div>
   )
} 