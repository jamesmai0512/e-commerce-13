import { render, fireEvent, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import Button, { ButtonProps } from '..'

describe('Button component', () => {
  const props: ButtonProps = {
    text: 'Click me',
    background: 'light',
    onClick: jest.fn(),
  }

  it('Should render correctly', () => {
    const component = render(<Button text="Click me" background="light" />)
    expect(component).toMatchSnapshot()
  })

  it('Should render the button text', () => {
    const { getByTestId } = render(<Button {...props} />)
    const button = getByTestId('button-component')
    expect(button).toBeTruthy()
  })

  it('Should call the onClick function when clicked', async () => {
    const { getByText } = render(<Button {...props} />)
    act(() => {
      fireEvent.click(getByText(props.text))
    })
    await waitFor(() => {
      expect(props.onClick).toHaveBeenCalled()
    })
  })
})
