import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProductBannerTop, { ProductBannerTopProps } from '../'

describe('ProductBannerTop', () => {
  const props: ProductBannerTopProps = {
    title: 'Product Title',
    buttonTheme: 'primary',
    buttonText: 'Buy Now',
    description: 'Product description',
    imageUrl: 'https://example.com/image.jpg',
  }

  it('Should render correctly', () => {
    const component = render(<ProductBannerTop {...props} />)
    expect(component).toMatchSnapshot()
  })
})
