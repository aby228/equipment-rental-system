'use client'

import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/ui/user-avatar'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
   CreditCardIcon,
   HeartIcon,
   ListOrderedIcon,
   LogOutIcon,
   MapPinIcon,
   UserIcon,
   Settings,
} from 'lucide-react'
import { ShoppingBasketIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface UserNavProps {
   user: any
}

export function UserNav({ user }: UserNavProps) {
   const router = useRouter()

   function onLogout() {
      // Remove user from localStorage
      localStorage.removeItem('user')
      // Redirect to home page
      router.push('/')
      // Reload to update authentication state
      window.location.reload()
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9 px-2 gap-2">
               <UserAvatar user={{ name: user?.name || 'User', avatar: user?.avatar }} size="sm" />
               <span className="hidden sm:inline">{user?.name || 'User'}</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>
               <div className="flex items-center gap-3">
                  <UserAvatar user={{ name: user?.name || 'User', avatar: user?.avatar }} size="sm" />
                  <div className="flex flex-col space-y-1">
                     <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                     <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <Link href="/profile">
                  <DropdownMenuItem className="flex gap-2">
                     <UserIcon className="h-4" />
                     My Profile
                  </DropdownMenuItem>
               </Link>
               <Link href="/profile">
                  <DropdownMenuItem className="flex gap-2">
                     <ListOrderedIcon className="h-4" />
                     My Orders
                  </DropdownMenuItem>
               </Link>
               <Link href="/wishlist">
                  <DropdownMenuItem className="flex gap-2">
                     <HeartIcon className="h-4" />
                     Wishlist
                  </DropdownMenuItem>
               </Link>
               <Link href="/cart">
                  <DropdownMenuItem className="flex gap-2">
                     <ShoppingBasketIcon className="h-4" />
                     Cart
                  </DropdownMenuItem>
               </Link>
               <DropdownMenuSeparator />
               <Link href="/profile">
                  <DropdownMenuItem className="flex gap-2">
                     <Settings className="h-4" />
                     Settings
                  </DropdownMenuItem>
               </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-2" onClick={onLogout}>
               <LogOutIcon className="h-4" />
               Logout
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
