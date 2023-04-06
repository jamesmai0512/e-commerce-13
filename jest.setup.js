jest.mock('next/router', () => require('next-router-mock'))

window.matchMedia = jest.fn().mockImplementation(() => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}))
