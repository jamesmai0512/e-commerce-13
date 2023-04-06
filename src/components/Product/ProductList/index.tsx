'use client'

import { useMemo } from 'react'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'

// Components
import Product from '..'

// Types
import { TProduct } from '@/constants/common'

import styles from '../Product.module.css'

interface IProductListProps {
  products: TProduct[]
}

const ProductList = ({ products }: IProductListProps) => {
  const searchParams: ReadonlyURLSearchParams | null = useSearchParams()
  const querySearch = searchParams?.get('search')
  const category = searchParams?.get('category')
  const { product, product_box, product_box_item } = styles

  const filteredProducts = useMemo(() => {
    if (category) {
      return products.filter((product: TProduct) =>
        product.category.includes(category as string),
      )
    } else if (querySearch) {
      return products.filter((item: TProduct) =>
        item.title.toLowerCase().includes(querySearch.toLowerCase()),
      )
    }
    return products
  }, [category, products, querySearch])

  return (
    <div className={product}>
      <div className={product_box}>
        {filteredProducts.map((product: TProduct) => (
          <div key={product.id} className={product_box_item}>
            <Product
              key={product.id}
              id={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              price={product.price}
              imageSize="small"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
