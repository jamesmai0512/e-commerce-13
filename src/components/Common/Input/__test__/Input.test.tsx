import React from 'react'
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react'
import Input from '..'

describe('Input', () => {
  it('Should render correctly', () => {
    const placeholder = 'Enter your email'

    const component = render(
      <Input placeholder={placeholder} background={'dark'} />,
    )
    expect(component).toMatchSnapshot()
  })
  it('Should renders with a placeholder', () => {
    const placeholder = 'Enter your email'
    const { getByPlaceholderText } = render(
      <Input placeholder={placeholder} background={'dark'} />,
    )
    expect(getByPlaceholderText(placeholder).getAttribute('placeholder')).toBe(
      placeholder,
    )
  })

  it('Should renders with a value', () => {
    const onChange = jest.fn()

    const value = 'test@example.com'
    const placeholder = 'Enter your email'
    const { getByDisplayValue } = render(
      <Input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        background={'dark'}
      />,
    )
    expect(getByDisplayValue(value)).toBeTruthy()
  })

  it('Should fires onChange event', async () => {
    const onChange = jest.fn()
    const placeholder = 'Enter your email'

    const { getByTestId } = render(
      <Input
        placeholder={placeholder}
        onChange={onChange}
        background={'dark'}
      />,
    )
    const input = getByTestId('input-email')
    act(() => {
      fireEvent.change(input, { target: { value: 'test@example.com' } })
    })

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
    })
  })
})
