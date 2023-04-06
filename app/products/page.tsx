import ProductList from '@/components/Product/ProductList'
import LoadingIndicator from '@/components/Common/LoadingIndicator'
import { getProductList } from '@/utils/fetchers/ProductFetcher'

import styles from './Product.module.css'

const ProductsPage = async () => {
  const { none_product, text_alert_info, text_alert } = styles
  const products = await getProductList()

  console.log(products)

  if (!products) return <LoadingIndicator />

  return (
    <div>
      <div>
        {products && products.length ? (
          <ProductList products={products} />
        ) : (
          <div className={none_product}>
            <div className={text_alert_info}>
              <h1 className={text_alert}>There are no products!!</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
