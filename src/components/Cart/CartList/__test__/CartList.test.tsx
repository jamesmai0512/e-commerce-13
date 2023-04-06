import { CartItem } from '@/app/user/carts/page'
import { render, fireEvent } from '@testing-library/react'
import CartList from '../'

describe('CartList', () => {
  const cartItems: CartItem[] = [
    { id: '1', productId: 1, quantity: 1, price: 10 },
    { id: '2', productId: 2, quantity: 2, price: 20 },
  ]

  it('Should render correctly', () => {
    const component = render(<CartList carts={cartItems} />)
    expect(component).toMatchSnapshot()
  })
})
