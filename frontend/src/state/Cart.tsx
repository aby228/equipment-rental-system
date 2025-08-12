import { getLocalCart, writeLocalCart } from '@/lib/cart'
import { isVariableValid } from '@/lib/utils'
import { useUserContext } from '@/state/User'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface CartItem {
  product: any;
  productId: number;
  count: number;
}

interface Cart {
  items: CartItem[];
  total: number;
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  refreshCart: () => void;
  dispatchCart: (cart: Cart) => void;
}

const CartContext = createContext<CartContextType>({
   cart: null,
   loading: true,
   refreshCart: () => {},
   dispatchCart: () => {},
})

export const useCartContext = () => {
   return useContext(CartContext)
}

interface User {
   cart: any;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
   const [cart, setCart] = useState<any>(null)
   const [loading, setLoading] = useState(false)

   async function refreshCart() {
      try {
         setLoading(true)

         const response = await fetch('/api/cart', {
            cache: 'no-store',
         })

         const user: User = await response.json()

         if (isVariableValid(user)) {
            setCart(user?.cart)
            writeLocalCart(user?.cart)
         }
         if (!isVariableValid(user)) setCart(getLocalCart())
      } catch (error) {
         console.error({ error })
         setCart(getLocalCart())
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      async function loadCart() {
         try {
            setLoading(true)

            const response = await fetch('/api/cart', {
               cache: 'no-store',
            })

            const user: User = await response.json()

            if (isVariableValid(user)) {
               setCart(user?.cart)
               writeLocalCart(user?.cart)
            }
            if (!isVariableValid(user)) setCart(getLocalCart())
         } catch (error) {
            console.error({ error })
            setCart(getLocalCart())
         } finally {
            setLoading(false)
         }
      }

      loadCart()
   }, [])

   const dispatchCart = (newCart: any) => {
      setCart(newCart)
      writeLocalCart(newCart)
   }

   return (
      <CartContext.Provider
         value={{ cart, loading, refreshCart, dispatchCart }}
      >
         {children}
      </CartContext.Provider>
   )
}
