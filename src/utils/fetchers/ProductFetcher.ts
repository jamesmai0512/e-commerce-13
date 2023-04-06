// import 'server-only'
import { API, TProduct } from '@/constants/common'
import { notFound } from 'next/navigation'

export async function getProduct(productId: string | undefined) {
  const res = await fetch(`${API}/products/${productId}`, {
    cache: 'force-cache',
  })
  if (!res.ok) {
    notFound()
  }
  return res.json()
}

export async function getProductList(): Promise<TProduct[]> {
  const res = await fetch(`${API}/products`, { cache: 'force-cache' })

  if (!res.ok) {
    notFound()
  }
  const data = await res.json()
  return data
}
