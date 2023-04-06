import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Product from '../'
import mockRouter from 'next-router-mock'

jest.mock('next/router', () => require('next-router-mock'))
describe('Product component', () => {
  const props = {
    id: 1,
    imageUrl: 'https://loremflickr.com/640/480/technics',
    title: 'Product Title',
    price: 9.99,
    imageSize: 'small',
  }

  beforeEach(() => {
    mockRouter.push('/products/1')
  })

  it('renders product details correctly', async () => {
    render(<Product {...props} />)
    expect(screen.getByText(props.title)).toBeInTheDocument()
    expect(screen.getByText(`$${props.price}`)).toBeInTheDocument()
    const image = screen.getByAltText('product-image') as HTMLImageElement
    expect(image).toBeTruthy()
    act(() => {
      fireEvent.click(screen.getByTestId('product-item'))
    })
    await waitFor(() => {
      expect(window.location.pathname).toBe(`/`)
      expect(mockRouter).toMatchObject({
        asPath: `/products/${props.id}`,
        pathname: `/products/${props.id}`,
      })
    })
  })

  // it('does not render item class when imageSize is not small', () => {
  //   const { container } = render(<Product {...props} imageSize="large" />)
  //   expect(
  //     (container.firstChild as HTMLElement)?.classList.contains('product_item'),
  //   ).toBeFalsy()
  // })
})
