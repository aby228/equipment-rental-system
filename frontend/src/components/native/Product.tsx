import { ImageSkeleton } from '@/components/native/icons'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { EquipmentWithIncludes } from '@/types/equipment'
import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'

export const ProductGrid = ({
   products,
}: {
   products: EquipmentWithIncludes[]
}) => {
   return (
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
         {products.map((product) => (
            <Product product={product} key={product.id} />
         ))}
      </div>
   )
}

export const ProductSkeletonGrid = () => {
   return (
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
         {[...Array(12)].map(() => (
            <ProductSkeleton key={Math.random()} />
         ))}
      </div>
   )
}

export const Product = ({ product }: { product: EquipmentWithIncludes }) => {
   function Price() {
      // Convert daily rate to hourly rate (assuming 8-hour work day)
      const hourlyRate = Number(product?.dailyRate) / 8
      
      return (
         <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
               <Clock className="w-4 h-4 text-gray-500" />
               <span className="text-lg font-bold">
                  ${hourlyRate.toFixed(2)}
               </span>
               <span className="text-sm text-muted-foreground">/hr</span>
            </div>
         </div>
      )
   }

   // Map equipment names to image paths
   const getEquipmentImage = (equipmentName: string) => {
      const imageMap: { [key: string]: string } = {
         'Welder Generator': '/images/equipment/welder generator.jpg',
         'Heavy-Duty Grout Pump': '/images/equipment/HEAVY-DUTY GROUT PUMP.jpg',
         'Tube and Clamp Scaffold System': '/images/equipment/Tube and Clamp Scaffold System.jpg',
         'AMT Self-Priming Sewage Trash Pump': '/images/equipment/AMT Self-Priming Sewage Trash Pump.jpg',
         'Electric Auxiliary Water Pump': '/images/equipment/Electric Auxiliary Water Pump.jpg',
         'High Torque Impact Wrench': '/images/equipment/High Torque Impact Wrench.jpg',
         'Torque-Impact Wrench': '/images/equipment/Torque-Impact Wrench.jpg',
         'Stainless Digging Spade': '/images/equipment/Stainless Digging Spade.jpg',
         'Shovel with Axe Edge': '/images/equipment/Shovel with Axe Edge.jpg',
         '27" Light Strong Small Spade Shovel': '/images/equipment/27 Inch Light Strong Small Spade Shovel Mini Kid Gardening Shovel.jpg',
         'Trolley Wheelbarrow': '/images/equipment/TROLLEY-WHEELBARROW.jpg',
         'Heavy-Duty 8 cu ft Poly Wheelbarrow': '/images/equipment/Heavy-Duty, 8 cu ft, Poly Wheelbarrow.jpg',
         'Portable Light Tower': '/images/equipment/Portable Light Tower.png',
         'Self-Propelled Petrol Lawn Mower': '/images/equipment/self-propelled-petrol-lawnmower.jpg',
         'Gas Push Lawn Mower': '/images/equipment/Gas Push Lawn Mower.jpg',
         'Stainless Steel Cement Edger': '/images/equipment/Stainless Steel Cement Edger.jpeg',
         '8" x 3" Finishing Trowel': '/images/equipment/8-x-3-finishing-trowel-square-soft-handle.jpg',
         'WL12000HE-03-A Portable Generator': '/images/equipment/WL12000HE-03-A Portable Generator.jpg',
         'Cummins Diesel Generator': '/images/equipment/Cummins-Diesel-Generators.png',
         '5-Axle Concrete Mixer': '/images/equipment/5-Axle Concrete Mixer.jpg',
         'Transit Concrete Mixer': '/images/equipment/transit-concrete-mixer.jpg',
         'Concrete Mixer 1.5HP Electric 120V': '/images/equipment/Concrete Mixer 1.5HP Elecric 120V.jpg',
         'Scissor Lift': '/images/equipment/Scissor Lift.jpg',
         'Aerial Lifts': '/images/equipment/Aerial Lifts.jpg'
      }
      
      return imageMap[equipmentName] || '/placeholder-equipment.jpg'
   }

   return (
      <Link className="" href={`/products/${product.id}`}>
         <Card className="h-full group hover:shadow-lg transition-all duration-200">
            <CardHeader className="p-0">
               <div className="relative h-60 w-full">
                  <Image
                     className="rounded-t-lg object-cover group-hover:scale-105 transition-transform duration-200"
                     src={getEquipmentImage(product.name)}
                     alt={product.name}
                     fill
                     sizes="(min-width: 1000px) 30vw, 50vw"
                  />
               </div>
            </CardHeader>
            <CardContent className="grid gap-1 p-4">
               <Badge variant="outline" className="w-min text-neutral-500">
                  Equipment
               </Badge>

               <h2 className="mt-2 font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {product.name}
               </h2>
               <p className="text-xs text-neutral-500 text-justify">
                  {product.description}
               </p>
            </CardContent>
            <CardFooter>
               {product?.quantity > 0 ? (
                  <Price />
               ) : (
                  <Badge variant="secondary">Out of stock</Badge>
               )}
            </CardFooter>
         </Card>
      </Link>
   )
}

export function ProductSkeleton() {
   return (
      <Link href="#">
         <div className="animate-pulse rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
            <div className="relative h-full w-full">
               <div className="flex h-40 w-full items-center justify-center rounded bg-neutral-300 dark:bg-neutral-700 ">
                  <ImageSkeleton />
               </div>
            </div>
            <div className="p-5">
               <div className="w-full">
                  <div className="mb-4 h-2.5 w-48 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="mb-2.5 h-2 max-w-[480px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="mb-2.5 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="h-2 max-w-[360px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
               </div>
            </div>
         </div>
      </Link>
   )
}
