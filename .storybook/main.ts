const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: [],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: path.resolve(__dirname, '../next.config.js'),
    },
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },
  features: {
    storyStoreV7: true,
  },
  async webpackFinal(config) {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    ]
    return config
  },
}
