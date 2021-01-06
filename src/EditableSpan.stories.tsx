import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {Task, TaskPropsType} from './Task';
import {EditableSpan, EditableSpanPropsType} from './EditableSpan';


export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        title:{
        description: 'Initial title'
        },
        changeTitle: {
            description: 'Title will be change'
        }
    }
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanBaseExample = Template.bind({});
EditableSpanBaseExample.args = {
    title: 'Example',
    changeTitle: action('Title was changed')
};
