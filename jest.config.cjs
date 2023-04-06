module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'path/to/your/tsconfig.json',
    },
  },
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/src/**/*.{js,ts,tsx}',
    '!**/*.test.{js,ts,tsx}',
    '!**/*.stories.{js,ts,tsx}',
    '!src/themes/**/*.{js,ts,tsx}',
    '!src/component/**/__test__/__snapshots__/*.test.{js,ts,tsx}.snap',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^.+\\.module\\.(css)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'test-file-stub',
    '.+\\.(css|styl|less|sass|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
    '/^(.*)$/': '<rootDir>/src/$1',
    '@/constants/(.*)': '<rootDir>/src/constants/$1',
    '@/app/(.*)': '<rootDir>/app/$1',
    '@/components/(.*)': '<rootDir>/src/components/$1',
    '@/utils/(.*)': '<rootDir>/src/utils/$1',
  },
}
