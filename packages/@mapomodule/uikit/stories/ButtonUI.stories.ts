import type { StoryObj, Meta } from '@storybook/vue3';
import { expect, within } from '@storybook/test';

import ButtonUI from '../components/ButtonUI.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Atoms/ButtonUI',
  component: ButtonUI,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof ButtonUI>;

export default meta
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature
 to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */

export const Button: Story = {
  args: {},
  render: (args) => ({
    components: { ButtonUI },
    template: '<ButtonUI v-bind="args">Test</ButtonUI>',
  }),
}
