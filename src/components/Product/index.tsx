'use client'

import { memo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import styles from './Product.module.css'

export type ProductProps = {
  imageUrl: string
  title: string
  price: number
  imageSize: string
  id?: number
}

const Product = ({ id, imageUrl, title, price, imageSize }: ProductProps) => {
  const router = useRouter()
  const imageSizeValue = imageSize === 'small' ? '305' : '630'
  const {
    product_item,
    product_image,
    product_details,
    product_title,
    product_price,
    product_image_banner,
  } = styles

  const handleClickProduct = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault()
    console.log(id)

    router.push(`/products/${id}`)
  }

  return (
    <div
      onClick={handleClickProduct}
      className={imageSize === 'small' ? `${product_item}` : ''}
      data-testid="product-item"
    >
      <div className={`${product_image} ${styles[imageSize]}`}>
        <Image
          src={imageUrl}
          alt="product-image"
          width={imageSizeValue}
          height="375"
          loading="eager"
        />
      </div>
      <div className={product_details}>
        <h3 className={product_title}>{title}</h3>
        <p className={product_price}>${price}</p>
      </div>
    </div>
  )
}

export default memo(Product)
