import { memo, useCallback, useState } from 'react'
import Image from 'next/image'
import InputNumber from '../Common/Input/InputNumber'

import styles from './Cart.module.css'

import { API, cartImageUrl } from '../../constants/common'

export interface CartProps {
  cartId: string
  productId: number
  quantity: number
  price: number
  updateCartItemQuantity: (cartItemId: string, newQuantity: number) => void
  deleteCartItem: (cartItemId: string) => void
}

const Cart = ({
  quantity,
  cartId,
  productId,
  price,
  updateCartItemQuantity,
  deleteCartItem,
}: CartProps) => {
  const [value, setValue] = useState(quantity)

  const {
    cart_layout,
    cart_layout_info,
    cart_layout_info_product,
    cart_layout_info_product_title,
    cart_layout_info_product_description,
    cart_layout_info_product_price,
    cart_layout_info_quantity,
    cart_layout_info_product_price_total,
  } = styles

  const updateShoppingCart = useCallback(
    async (newQuantityCart: number) => {
      updateCartItemQuantity(cartId, newQuantityCart)

      const response = await fetch(`${API}/carts/${cartId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: newQuantityCart,
          productId: productId,
          id: cartId,
        }),
      })

      if (!response.ok) {
        throw new Error('Unable to update shopping cart')
      }

      return await response.json()
    },
    [cartId, productId, updateCartItemQuantity],
  )

  const deleteCart = useCallback(async () => {
    try {
      const response = await fetch(`${API}/carts/${cartId}`, {
        method: 'DELETE',
      })
      console.log('response result', response)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      deleteCartItem(cartId)

      console.log(`Cart was deleted successfully`)
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }, [cartId, deleteCartItem])

  const onIncrease = useCallback(() => {
    if (value < 10) {
      const newValue = value + 1
      setValue(newValue)
      updateShoppingCart(newValue)
      console.log('increase')
    }
  }, [value, updateShoppingCart])

  const onDecrease = useCallback(async () => {
    const newValue = value - 1
    if (newValue === 0) {
      if (confirm('Are you sure you want to delete?')) {
        await deleteCart()
      }
    } else {
      setValue(newValue)
      updateShoppingCart(newValue)
    }
  }, [value, updateShoppingCart, deleteCart])

  return (
    <div role="cart-item" className={cart_layout}>
      <div className={cart_layout_info}>
        <Image
          src={cartImageUrl}
          alt="product-image"
          width={109}
          height={134}
          loading="eager"
        />
        <div className={cart_layout_info_product}>
          <h2
            data-testid="cart-title"
            className={cart_layout_info_product_title}
          >
            Graystone vase
          </h2>
          <p className={cart_layout_info_product_description}>
            A timeless ceramic vase with a tri color grey glaze.
          </p>
          <h3
            data-testid="cart-price"
            className={cart_layout_info_product_price}
          >
            £{price}
          </h3>
        </div>
      </div>
      <div className={cart_layout_info_quantity}>
        <InputNumber
          value={value}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      </div>
      <h3 className={cart_layout_info_product_price_total}>£{value * price}</h3>
    </div>
  )
}

export default memo(Cart)
