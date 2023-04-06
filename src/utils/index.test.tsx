import { API } from '@/constants/common'
import { fetcher } from './index'

describe('fetcher', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === API) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: 'fake data' }),
        })
      } else {
        return Promise.reject(new Error('Invalid URL'))
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should return the JSON data when given a valid URL', async () => {
    const data = await fetcher(API)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(API)

    expect(data).toEqual({ data: 'fake data' })
  })

  it('Should throw an error when given an invalid URL', async () => {
    const invalidUrl = 'invalid url'

    await expect(fetcher(invalidUrl)).rejects.toThrowError('Invalid URL')
  })
})
