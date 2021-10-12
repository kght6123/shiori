const { resolve } = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
  ],
  core: {
    builder: 'storybook-builder-vite',
  },
  viteFinal: (config, { configType }) => {
    // add StoryBook + Vite + TypeScript
    // https://github.com/eirslett/storybook-builder-vite
    // console.log(config.resolve.alias, configType)
    config.resolve.alias = [
      { find: /^@(?=\/)/, replacement: resolve(__dirname, '../src') },
      { find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' },
    ]
    // console.log(config.resolve.alias)
    return config
  },
}
