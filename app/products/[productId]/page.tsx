import dynamic from 'next/dynamic'

// Component
const Button = dynamic(() => import('@/components/Common/Button'))
const ProductDetail = dynamic(
  () => import('@/components/Product/ProductDetail'),
)

const Input = dynamic(() => import('@/components/Common/Input'))
const BoxInfo = dynamic(() => import('@/components/Common/Box/BoxInfo'))

// Constants
import { API, ORDERSTEPS, TProduct } from '@/constants/common'

import { getProduct } from '@/utils/fetchers/ProductFetcher'
import styles from '../Product.module.css'

export interface ProductDetailPageProps {
  params: { productId: string }
}

async function generateStaticParams() {
  const products = await fetch(`${API}/products`).then((res) => res.json())

  return products.map((product: TProduct) => ({
    productId: product.id,
  }))
}

const ProductDetailPage = async ({
  params,
}: {
  params: { productId: string }
}) => {
  const {
    introduce_brand,
    order_step,
    email_form,
    form_text,
    form_text_title,
    form_text_description,
    form_email_submit,
  } = styles

  const { productId } = params
  const product = await getProduct(productId)

  return (
    <div>
      <ProductDetail product={product} />
      <h1 className={introduce_brand}>What makes our brand different</h1>
      <div className={order_step}>
        {ORDERSTEPS.map((i) => (
          <BoxInfo
            key={i.id}
            icon={i.icon}
            title={i.title}
            description={i.description}
          />
        ))}
      </div>

      <div className={email_form}>
        <div className={form_text}>
          <h1 className={form_text_title}>
            Join the club and get the benefits
          </h1>
          <p className={form_text_description}>
            Sign up for our newsletter and receive exclusive offers on new
            ranges, sales, pop up stores and more
          </p>
          <form className={form_email_submit}>
            <Input background="light" placeholder="your@email.com" />
            <Button background="purple" text="Sign Up" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
