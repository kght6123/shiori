import initStoryshots from '@storybook/addon-storyshots'
import { puppeteerTest } from '@storybook/addon-storyshots-puppeteer'
import path from 'path'

initStoryshots({
  suite: 'Puppeteer storyshots',
  test: puppeteerTest({
    // storybookUrl: 'file:///path/to/my/storybook-static',
    storybookUrl: `file://${path.resolve(__dirname, '../storybook-static')}`,
  }),
  configPath: path.resolve(__dirname, '../.storybook'),
})
