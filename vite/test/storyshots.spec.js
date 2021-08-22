import path from 'path'
import initStoryshots, {
  multiSnapshotWithOptions,
} from '@storybook/addon-storyshots'

initStoryshots({
  configPath: path.resolve(__dirname, '../.storybook'),
  integrityOptions: { cwd: path.resolve(__dirname, '../src/stories') },
  framework: 'vue3',
  test: multiSnapshotWithOptions(),
})
