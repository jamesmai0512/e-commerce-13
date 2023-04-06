import { act, fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import InputNumber from '..'

describe('InputNumber', () => {
  const onDecreaseMock = jest.fn()
  const onIncreaseMock = jest.fn()

  afterEach(() => {
    onDecreaseMock.mockClear()
    onIncreaseMock.mockClear()
  })

  it('should increase the value by 1 when the plus button is clicked', async () => {
    const { getByText } = render(
      <InputNumber
        value={0}
        onDecrease={onDecreaseMock}
        onIncrease={onIncreaseMock}
      />,
    )

    const plusButton = getByText('+')
    act(() => {
      fireEvent.click(plusButton)
    })

    await waitFor(() => {
      expect(onIncreaseMock).toBeCalled()
    })
  })

  it('should decrease the value by 1 when the minus button is clicked', async () => {
    const { getByText } = render(
      <InputNumber
        value={2}
        onDecrease={onDecreaseMock}
        onIncrease={onIncreaseMock}
      />,
    )

    const minusButton = getByText('-')
    act(() => {
      fireEvent.click(minusButton)
    })
    await waitFor(() => {
      expect(onDecreaseMock).toBeCalled()
    })
  })

  it('should not decrease the value below the minimum value of 0', async () => {
    const { getByText, findByDisplayValue } = render(
      <InputNumber
        value={0}
        onDecrease={onDecreaseMock}
        onIncrease={onIncreaseMock}
      />,
    )

    const minusButton = getByText('-')
    act(() => {
      fireEvent.click(minusButton)
    })

    await waitFor(() => {
      expect(findByDisplayValue('0')).toBeTruthy()
    })
  })

  it('should not increase the value above the maximum value of 10', async () => {
    const { getByText, findByDisplayValue } = render(
      <InputNumber
        value={10}
        onDecrease={onDecreaseMock}
        onIncrease={onIncreaseMock}
      />,
    )

    const plusButton = getByText('+')

    act(() => {
      fireEvent.click(plusButton)
    })

    await waitFor(() => {
      expect(findByDisplayValue('10')).toBeTruthy()
    })
  })
})
