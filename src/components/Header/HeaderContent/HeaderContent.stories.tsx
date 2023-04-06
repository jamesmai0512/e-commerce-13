import React from 'react'
import { Meta, Story } from '@storybook/react'
import HeaderContent from '.'

export default {
  title: 'Components/HeaderContent',
  component: HeaderContent,
} as Meta

const Template: Story = (args) => <HeaderContent {...args} />

export const Default = Template.bind({})
