import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import mockRouter from 'next-router-mock'
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes'
import Header from '../'

mockRouter.useParser(createDynamicRouteParser(['/products/[productId]']))
describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should render correctly', () => {
    mockRouter.push('/initial-path')
    const component = render(<Header />)
    expect(component).toMatchSnapshot()
  })

  it('Should render brand name', () => {
    const { getByText } = render(<Header />)
    const brandName = getByText('Avion')

    expect(brandName).toBeInTheDocument()
  })

  it('Should render Navbar for product', () => {
    mockRouter.push('/products/33')

    const { getByText } = render(<Header />)
    const brandName = getByText('Avion')

    expect(brandName).toBeInTheDocument()
  })
})
