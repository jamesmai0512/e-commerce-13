import { API } from '@/constants/common'
import { notFound } from 'next/navigation'

export const getCarts = async () => {
  const res = await fetch(`${API}/carts`, { cache: 'no-store' })
  console.log(res)
  if (!res.ok) {
    notFound()
  }
  return res.json()
}
