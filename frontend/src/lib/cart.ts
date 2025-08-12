interface CartItem {
   product: any;
   productId: number;
   count: number;
}

interface Cart {
   items: CartItem[];
}

export function writeLocalCart(cart: Cart) {
   window.localStorage.setItem('Cart', JSON.stringify(cart))
}

export function getLocalCart() {
   if (typeof window !== 'undefined' && window.localStorage) {
      try {
         const cartData = window.localStorage.getItem('Cart')
         return cartData ? JSON.parse(cartData) : null
      } catch (error) {
         writeLocalCart({ items: [] })
         return { items: [] }
      }
   }
}

interface GetCountInCartParams {
   cartItems: CartItem[];
   productId: number;
}

export function getCountInCart({ cartItems, productId }: GetCountInCartParams) {
   try {
      for (let i = 0; i < cartItems.length; i++) {
         if (cartItems[i]?.productId === productId) {
            return cartItems[i]?.count
         }
      }

      return 0
   } catch (error) {
      console.error({ error })
      return 0
   }
}
