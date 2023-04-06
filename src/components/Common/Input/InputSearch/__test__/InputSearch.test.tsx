import zIndex from '@mui/material/styles/zIndex'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import InputSearch from '..'

describe('InputSearch', () => {
  const handleFormSubmitMock = jest.fn()
  const onChangeMock = jest.fn()

  beforeEach(() => {
    handleFormSubmitMock.mockClear()
    onChangeMock.mockClear()
  })

  it('Should renders correctly', () => {
    const { container } = render(
      <InputSearch
        position="top"
        handleFormSubmit={handleFormSubmitMock}
        onChange={onChangeMock}
      />,
    )

    expect(container).toMatchSnapshot()
  })

  it('Should calls handleFormSubmit when the form is submitted', async () => {
    const { getByRole, getByText } = render(
      <InputSearch
        position="top"
        handleFormSubmit={handleFormSubmitMock}
        onChange={onChangeMock}
      />,
    )

    const searchInput = getByRole('textbox')

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'test' } })
      fireEvent.submit(searchInput)
    })

    await waitFor(() => {
      expect(handleFormSubmitMock).toHaveBeenCalledWith(expect.anything())
    })
  })

  it('Should calls onChange when the input value changes', async () => {
    const { getByRole } = render(
      <InputSearch
        position="top"
        handleFormSubmit={handleFormSubmitMock}
        onChange={onChangeMock}
      />,
    )

    const searchInput = getByRole('textbox')

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'test' } })
    })

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith(expect.anything())
    })
  })
})
