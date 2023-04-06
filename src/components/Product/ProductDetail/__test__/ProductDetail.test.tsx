import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'
import ProductDetail from '../'
import { TProduct } from '@/constants/common'

jest.mock('next/router')

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

const mockProduct: TProduct = {
  id: 1,
  title: 'Big Chair',
  price: 250,
  imageUrl: 'https://loremflickr.com/640/480/technics',
  category: 'tables'
}

describe('ProductDetail', () => {
    it('Should render correctly', () => {
    const component = render(<ProductDetail product={mockProduct} />)
    expect(component).toMatchSnapshot()
    })
  it('renders product title and price', () => {
    render(<ProductDetail product={mockProduct} />)
    const title = screen.getByText(mockProduct.title)
    const price = screen.getByText(`£${mockProduct.price}`)
    expect(title).toBeInTheDocument()
    expect(price).toBeInTheDocument()
  })

  it('renders product description', () => {
    render(<ProductDetail product={mockProduct} />)
    const descriptionTitle = screen.getByText('Description')
    expect(descriptionTitle).toBeInTheDocument()
    const descriptionContent = screen.getByText(
      'A timeless design, with premium materials features as one of our most popular and iconic pieces. The dandy chair is perfect for any stylish living space with beech legs and lambskin leather upholstery.',
    )
    expect(descriptionContent).toBeInTheDocument()
  })

  it('renders product dimensions', () => {
    render(<ProductDetail product={mockProduct} />)
    const dimensionsTitle = screen.getByText('Dimensions')
    expect(dimensionsTitle).toBeInTheDocument()
    const height = screen.getByText('Height\n110cm')
    expect(height).toBeInTheDocument()
    const width = screen.getByText('Width\n75cm')
    expect(width).toBeInTheDocument()
    const depth = screen.getByText('Depth\n50px')
    expect(depth).toBeInTheDocument()
  })

//   it('renders input number and add to cart button', () => {
//     render(<ProductDetail product={mockProduct} />)
//     const inputNumber = screen.getByRole('spinbutton')
//     expect(inputNumber).toBeInTheDocument()
//     const addToCartButton = screen.getByRole('button', { name: 'Add to cart' })
//     expect(addToCartButton).toBeInTheDocument()
//   })

//   it('calls router.push when adding product to cart', async () => {
//     mockedUseRouter.mockReturnValue({ push: jest.fn() } as any)
//     const mockQuantity = 3
//     const addProductToCartMock = jest.fn()
//     render(
//       <ProductDetail product={mockProduct} addProductToCart={addProductToCartMock} />,
//     )
//     const inputNumber = screen.getByRole('spinbutton')
//     fireEvent.change(inputNumber, { target: { value: mockQuantity } })
//     const addToCartButton = screen.getByRole('button', { name: 'Add to cart' })
//     fireEvent.click(addToCartButton)
//     expect(addProductToCartMock).toHaveBeenCalledWith(mockQuantity, expect.anything())
//     expect(mockedUseRouter().push).toHaveBeenCalledWith('/user/carts')
//   })
})
