// Component
import CartList from '@/components/Cart/CartList'

// Fetcher
import { getCarts } from '@/utils/fetchers/CartFetcher'

import styles from './Carts.module.css'

const { none_product, text_alert_info, text_alert } = styles

export interface CartItem {
  id: string
  quantity: number
  productId: number
  price: number
}

const Carts = async () => {
  const carts = await getCarts()

  return (
    <div>
      {carts && carts.length ? (
        <CartList carts={carts} />
      ) : (
        <div className={none_product}>
          <div className={text_alert_info}>
            <h1 className={text_alert}>There are no carts!!</h1>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carts
