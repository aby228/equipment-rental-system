'use client'

import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
   navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import config from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { forwardRef } from 'react'

const equipmentCategories: { title: string; href: string; description: string }[] = [
   {
      title: 'Power Equipment',
      href: '/products?category=Power Equipment',
      description: 'Generators, welders, and electrical equipment for construction sites.',
   },
   {
      title: 'Concrete Equipment',
      href: '/products?category=Concrete Equipment',
      description: 'Mixers, pumps, and tools for concrete and masonry work.',
   },
   {
      title: 'Access Equipment',
      href: '/products?category=Access Equipment',
      description: 'Scissor lifts, aerial lifts, and scaffolding systems.',
   },
   {
      title: 'Tools & Hand Tools',
      href: '/products?category=Tools',
      description: 'Professional tools and hand tools for construction projects.',
   },
   {
      title: 'Material Handling',
      href: '/products?category=Material Handling',
      description: 'Wheelbarrows and material transport equipment.',
   },
   {
      title: 'Pumps',
      href: '/products?category=Pumps',
      description: 'Water pumps, sewage pumps, and drainage equipment.',
   },
]

const equipmentBrands: { title: string; href: string; description: string }[] = [
   {
      title: 'AMT',
      href: '/products?brand=AMT',
      description: 'Professional pumps and water equipment.',
   },
   {
      title: 'Cummins',
      href: '/products?brand=Cummins',
      description: 'Industrial-grade diesel generators and power equipment.',
   },
   {
      title: 'WL',
      href: '/products?brand=WL',
      description: 'Portable generators and power solutions.',
   },
   {
      title: 'Professional',
      href: '/products?brand=Professional',
      description: 'Professional-grade construction tools and equipment.',
   },
   {
      title: 'Heavy-Duty',
      href: '/products?brand=Heavy-Duty',
      description: 'Heavy-duty equipment for demanding construction projects.',
   },
]

export function MainNav() {
   return (
      <div className="hidden md:flex gap-4">
         <Link href="/" className="flex items-center space-x-2">
            <Image
               src="/logo.png"
               alt="EDUSTECH ENTERPRISE Logo"
               width={32}
               height={32}
               className="rounded-md"
            />
            <div className="flex flex-col">
               <span className="hidden font-medium sm:inline-block">
                  {config.name}
               </span>
               <span className="hidden text-xs text-muted-foreground sm:inline-block">
                  {config.subtitle}
               </span>
            </div>
         </Link>
         <NavMenu />
      </div>
   )
}

export function NavMenu() {
   return (
      <NavigationMenu>
         <NavigationMenuList>
            <NavigationMenuItem>
               <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                     <div className="font-normal text-foreground/70">
                        Equipment
                     </div>
                  </NavigationMenuLink>
               </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
               <NavigationMenuTrigger>
                  <div className="font-normal text-foreground/70">
                     Categories
                  </div>
               </NavigationMenuTrigger>
               <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                     <li className="row-span-3">
                        <NavigationMenuLink asChild>
                           <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/products"
                           >
                              <div className="mb-2 mt-4 text-lg font-medium">
                                 {config.name}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                 Professional construction equipment available for hourly rental. 
                                 Browse our complete inventory of tools, machinery, and accessories.
                              </p>
                           </Link>
                        </NavigationMenuLink>
                     </li>
                     {equipmentCategories.map((category) => (
                        <ListItem key={category.title} href={category.href} title={category.title}>
                           {category.description}
                        </ListItem>
                     ))}
                  </ul>
               </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
               <NavigationMenuTrigger>
                  <div className="font-normal text-foreground/70">Brands</div>
               </NavigationMenuTrigger>
               <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                     {equipmentBrands.map((brand) => (
                        <ListItem
                           key={brand.title}
                           title={brand.title}
                           href={brand.href}
                        >
                           {brand.description}
                        </ListItem>
                     ))}
                  </ul>
               </NavigationMenuContent>
            </NavigationMenuItem>
         </NavigationMenuList>
      </NavigationMenu>
   )
}

const ListItem = forwardRef<
   React.ElementRef<'a'>,
   React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
   return (
      <li>
         <NavigationMenuLink asChild>
            <Link
               href={href || '#'}
               ref={ref}
               className={cn(
                  'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                  className
               )}
               {...props}
            >
               <div className="text-sm font-medium leading-none">{title}</div>
               <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {children}
               </p>
            </Link>
         </NavigationMenuLink>
      </li>
   )
})

ListItem.displayName = 'ListItem'
