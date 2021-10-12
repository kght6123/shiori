module.exports = {
  globals: {
    window: true,
    document: true,
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'node', 'es6'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '^.+\\.mdx?$': '@storybook/addon-docs/jest-transform-mdx',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@storybook/.*\\.vue$))'],
  testEnvironment: 'jsdom',
}
