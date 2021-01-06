import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {Task, TaskPropsType} from './Task';


export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [(Story) => <li style={{ listStyle:'none' }}><Story/></li>],
    argTypes: {
        task: {
            description: 'Task with which we are working'
        },
        removeTask: {
            description: 'Task will be delete'
        },
        changeTitle: {
            description: 'Title will be change'
        },
        changeStatus: {
            description: 'Status will be change'
        }
    },
} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const NotCompletedTask = Template.bind({});
NotCompletedTask.args = {
    task:{id:'1', title: 'Not completed', isDone: false},
    changeStatus: action('status changed'),
    changeTitle: action('title changed'),
    removeTask: action('task deleted')
};
export const CompletedTask = Template.bind({});
CompletedTask.args = {
    task:{id:'1', title: 'Completed', isDone: true},
    changeStatus: action('status changed'),
    changeTitle: action('title changed'),
    removeTask: action('task deleted')
};

