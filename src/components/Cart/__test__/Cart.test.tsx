import { fireEvent, getByText, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Cart from '../'
import mockRouter from 'next-router-mock'

jest.mock('next/router', () => require('next-router-mock'))

describe('Cart component', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/carts')
  })

  const props = {
    cartId: '123',
    productId: 456,
    quantity: 2,
    price: 10.5,
    updateCartItemQuantity: jest.fn(),
    deleteCartItem: jest.fn(),
  }
  it('Should render correctly', () => {
    const component = render(<Cart {...props} />)
    expect(component).toMatchSnapshot()
  })

  it('Should render correctly', () => {
    const { getByTestId } = render(<Cart {...props} />)
    expect(getByTestId('cart-title')).toHaveTextContent('Graystone vase')
    expect(getByTestId('cart-price')).toHaveTextContent('£10')
  })

  it('Should increase when user click button correctly', async () => {
    const { getByRole } = render(<Cart {...props} />)

    const increaseButton = getByRole('button-control-right')
    const cartInput = getByRole('cart-input-number')

    fireEvent.click(increaseButton)
    await waitFor(() => {
      expect(cartInput).toBeInTheDocument()
    })
  })

  it('Should remove when user click button correctly', async () => {
    const { getByRole, getByText } = render(<Cart {...props} quantity={1} />)

    const decreaseButton = getByRole('button-control-left')
    const cartInput = getByRole('cart-input-number')

    fireEvent.click(decreaseButton)
    await waitFor(() => {
      expect(cartInput).toBeInTheDocument()
    })
    const confirmButon = getByText('Are you sure you want to delete?')
    fireEvent.click(confirmButon)
    await waitFor(() => {
      expect(cartInput).toBeFalsy()
    })
  })

  it('Should decrease when user click button correctly', async () => {
    const { getByRole, getByText } = render(<Cart {...props} />)

    const decreaseButton = getByRole('button-control-left')
    const cartInput = getByRole('cart-input-number')

    fireEvent.click(decreaseButton)
    await waitFor(() => {
      expect(cartInput).toBeInTheDocument()
    })
  })
})
