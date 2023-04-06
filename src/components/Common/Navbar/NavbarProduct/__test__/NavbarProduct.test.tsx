import { fireEvent, render, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'

import '@testing-library/jest-dom/extend-expect'

import NavbarProduct from '..'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Navbar', () => {
  it('renders the brand name', () => {
    const { getByText } = render(<NavbarProduct />)
    expect(getByText('Avion')).toBeInTheDocument()
  })

  it('Should renders the navigation links', () => {
    const { getByText } = render(<NavbarProduct />)
    expect(getByText('Plant Pots')).toBeInTheDocument()
    expect(getByText('Ceramics')).toBeInTheDocument()
  })

  it('Should renders the navbar correctly', () => {
    const component = render(<NavbarProduct />)
    expect(component).toMatchSnapshot()
  })

  it('Should call function correctly when user click button', async () => {
    const component = render(<NavbarProduct />)
    const input = component.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Table value input' } })

    await waitFor(() => {
      expect(
        component.getByDisplayValue('Table value input'),
      ).toBeInTheDocument()
    })
  })

  it('Should call form function correctly when user enter', async () => {
    const mockRouter = {
      push: jest.fn(), // the component uses `router.push` only
      pathname: '/products',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const component = render(<NavbarProduct />)
    const input = component.getByRole('textbox')
    const button = component.getByRole('submit-button')
    fireEvent.change(input, { target: { value: 'Table value input' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(
        component.getByDisplayValue('Table value input'),
      ).toBeInTheDocument()
    })
  })
})
