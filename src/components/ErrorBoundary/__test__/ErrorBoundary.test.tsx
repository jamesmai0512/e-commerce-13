import { render, screen } from '@testing-library/react'
import ErrorBoundary from '../'

describe('ErrorBoundary', () => {
  const child = <div data-testid="child">Hello World</div>

  it('Should render correctly', () => {
    const component = render(<ErrorBoundary>{child}</ErrorBoundary>)
    expect(component).toMatchSnapshot()
  })
  it('renders children when there are no errors', () => {
    render(<ErrorBoundary>{child}</ErrorBoundary>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
