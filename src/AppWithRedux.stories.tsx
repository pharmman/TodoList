import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import AppWithRedux from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';


export default {
    title: 'Todolist/App',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
} as Meta;

const Template: Story = (args) => <AppWithRedux {...args} />;

export const AppExample = Template.bind({});