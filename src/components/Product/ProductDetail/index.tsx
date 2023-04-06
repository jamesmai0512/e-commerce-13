'use client'

import styles from '../Product.module.css'
import Image from 'next/image'
import { API, imageRoute, TProduct } from '@/constants/common'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CartItem } from '@/app/user/carts/page'
import { fetcher } from '../../../utils'

// Components
const Button = dynamic(() => import('@/components/Common/Button'))
const InputNumber = dynamic(
  () => import('@/components/Common/Input/InputNumber'),
)

// Image
const BigChair = imageRoute('BigChair')

interface ProductDetailProps {
  product: TProduct
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [value, setValue] = useState(1)
  const [carts, setCarts] = useState<CartItem[]>([])
  const router = useRouter()

  const {
    product_detail,
    product_detail_content,
    product_detail_content_title,
    product_detail_content_price,
    product_detail_content_description,
    product_detail_content_description_content,
    product_detail_content_description_list_content,
    product_detail_content_dimensions,
    product_detail_content_dimensions_size,
    cart_function_item,
    input_amount,
  } = styles

  useEffect(() => {
    const fetchCartsData = async () => {
      const cartsData = await fetcher(`${API}/carts`)
      setCarts(cartsData)
    }

    fetchCartsData()
  }, [])

  const addProductToCart = useCallback(
    async (newValue: number, event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      try {
        const existingCartItem = carts.find(
          (item: CartItem) => item.productId === product.id,
        )
        if (existingCartItem) {
          let updatedQuantity = newValue
          updatedQuantity += existingCartItem.quantity
          const response = await fetch(`${API}/carts/${existingCartItem.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productId: product.id,
              quantity: updatedQuantity,
            }),
          })
          if (!response.ok) {
            throw new Error('Unable to add product to cart')
          }
        } else {
          const response = await fetch(`${API}/carts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productId: product.id,
              quantity: newValue,
              price: product.price,
            }),
          })
          if (!response.ok) {
            throw new Error('Unable to add product to cart')
          }
        }
        router.push('/user/carts')
      } catch (error) {
        return {
          notFound: true,
        }
      }
    },
    [product.id, router, product.price],
  )

  const onIncrease = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      if (value < 10) {
        const newValue = value + 1
        setValue(newValue)
      }
    },
    [value],
  )

  const onDecrease = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()

      if (value > 0) {
        const newValue = value - 1
        setValue(newValue)
      }
    },
    [value],
  )

  return (
    <div className={product_detail}>
      <div>
        <Image
          src={BigChair}
          alt="product-image"
          loading="eager"
          width={721}
          height={759}
        />
      </div>
      <div className={product_detail_content}>
        <h1 className={product_detail_content_title}>{product.title}</h1>
        <h3 className={product_detail_content_price}>£{product.price}</h3>
        <h4 className={product_detail_content_description}>Description</h4>
        <div className={product_detail_content_description_content}>
          <p>
            A timeless design, with premium materials features as one of our
            most popular and iconic pieces. The dandy chair is perfect for any
            stylish living space with beech legs and lambskin leather
            upholstery.
          </p>
          <ul className={product_detail_content_description_list_content}>
            <li>Premium material</li>
            <li>Handmade upholstery</li>
            <li>Quality timeless classic</li>
          </ul>
        </div>
        <h4>Dimensions</h4>
        <div className={product_detail_content_dimensions}>
          <div className={product_detail_content_dimensions_size}>
            Height <br />
            110cm
          </div>
          <div className={product_detail_content_dimensions_size}>
            Width <br />
            75cm
          </div>
          <div className={product_detail_content_dimensions_size}>
            Depth <br />
            50px
          </div>
        </div>
        <form
          onSubmit={(event) => addProductToCart(value, event)}
          className={cart_function_item}
        >
          <div className={input_amount}>
            <h4>Amount</h4>
            <InputNumber
              value={value}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          </div>

          <Button type="submit" background="purple" text="Add to cart" />
        </form>
      </div>
    </div>
  )
}

export default ProductDetail
