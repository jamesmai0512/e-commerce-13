'use client'

import { Suspense, useCallback, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'

// Components
const Button = dynamic(() => import('@/components/Common/Button'))
const Cart = dynamic(() => import('@/components/Cart'))

import styles from './CartList.module.css'

// type
import { CartItem } from '@/app/user/carts/page'
import Loading from '@/app/loading'
interface ICartListProps {
  carts: CartItem[]
}

const CartList = ({ carts }: ICartListProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(carts)

  const {
    shopping_cart,
    shopping_cart_title,
    shopping_cart_info,
    shopping_cart_info_product,
    shopping_cart_list,
    shopping_cart_total,
    shopping_cart_total_content,
    shopping_cart_list_detail,
    shopping_cart_list_subtotal,
    shopping_cart_list_price,
    shopping_carts_list,
  } = styles

  const updateCartItemQuantity = useCallback(
    (cartItemId: string, newQuantity: number) => {
      if (cartItems) {
        const updatedCartItems = cartItems.map((cartItem: CartItem) =>
          cartItem.id === cartItemId
            ? { ...cartItem, quantity: newQuantity }
            : cartItem,
        )
        setCartItems(updatedCartItems)
      }
    },
    [cartItems],
  )

  const deleteCartItem = useCallback(
    (cartItemId: string) => {
      if (cartItems) {
        const updatedCartItems = cartItems.filter(
          (cartItem) => cartItem.id !== cartItemId,
        )
        setCartItems(updatedCartItems)
      }
    },
    [cartItems],
  )

  const totalPrice = useMemo(() => {
    if (cartItems) {
      return cartItems.reduce(
        (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
        0,
      )
    }
  }, [cartItems])

  return (
    <Suspense fallback={<Loading />}>
      <div className={shopping_cart}>
        <h1 className={shopping_cart_title}>Your shopping cart</h1>

        <div className={shopping_cart_info}>
          <p className={shopping_cart_info_product}>Product</p>
          <p className="table_name">Quantity</p>
          <p className="table_name">Total</p>
        </div>
        <div className={shopping_cart_list}>
          {cartItems.map((cartItem) => (
            <Cart
              key={cartItem.id}
              productId={cartItem.productId}
              cartId={cartItem.id}
              quantity={cartItem.quantity}
              price={cartItem.price}
              updateCartItemQuantity={updateCartItemQuantity}
              deleteCartItem={deleteCartItem}
            />
          ))}
        </div>
        <div className={shopping_cart_total}>
          <div className={shopping_cart_total_content}>
            <div className={shopping_cart_list_detail}>
              <h3 className={shopping_cart_list_subtotal}>Subtotal</h3>
              <h2 className={shopping_cart_list_price}>£{totalPrice}</h2>
            </div>
            <p className={shopping_carts_list}>
              Taxes and shipping are calculated at checkout
            </p>
            <Button background="purple" text="Go to checkout" />
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default CartList
