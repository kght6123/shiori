import path from 'path'
import initStoryshots from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'

initStoryshots({
  suite: 'Image storyshots',
  framework: 'vue3',
  integrityOptions: { cwd: path.resolve(__dirname, '../src/stories') },
  test: imageSnapshot({
    storybookUrl: `file://${path.resolve(__dirname, '../storybook-static')}`, // Storybookをビルド出力先を指定
    getMatchOptions: () => ({
      failureThreshold: 0.02, // 2% threshold,
      failureThresholdType: 'percent',
    }),
  }),
  configPath: path.resolve(__dirname, '../.storybook'),
})
