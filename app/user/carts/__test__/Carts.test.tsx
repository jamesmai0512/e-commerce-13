import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Carts, { CartItem } from '../page'

const carts: CartItem[] = [
  {
    id: '1',
    quantity: 2,
    productId: 1,
    price: 170,
  },
  {
    id: '2',
    quantity: 1,
    productId: 2,
    price: 85,
  },
]

describe('Carts', () => {
  it('Should renders the shopping cart title', () => {
    render(<Carts />)
    const titleElement = screen.getByText(/Your shopping cart/i)
    expect(titleElement).toBeInTheDocument()
  })

  it('Should renders the cart items with the correct quantity and total price', () => {
    render(<Carts />)
    const cartItemElements = screen.getAllByRole('cart-item')
    expect(cartItemElements).toHaveLength(2)
  })

  it('Should displays the "No carts" message when there are no carts', () => {
    render(<Carts />)
    const messageElement = screen.getByText(/There are no carts!!/i)
    expect(messageElement).toBeInTheDocument()
  })
})
