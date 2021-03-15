import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {Task, TaskPropsType} from './Task';
import {TaskPriorities, TaskStatuses} from '../../../../../api/todolistsAPI';
import {ReduxStoreProviderDecorator} from '../../../../../stories/decorators/ReduxStoreProviderDecorator';


export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {
        model: {
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
    task:{id:'1', title: 'Not completed', status: TaskStatuses.New,  addedDate: '',
        deadline: '',
        description: '',
        order: 1,
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: 'todolistId1'},
    // changeStatus: action('status changed'),
    // changeTitle: action('title changed'),
    // removeTask: action('task deleted')
};
export const CompletedTask = Template.bind({});
CompletedTask.args = {
    task:{id:'1', title: 'Completed', status: TaskStatuses.Completed,  addedDate: '',
        deadline: '',
        description: '',
        order: 1,
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: 'todolistId1'},
    // changeStatus: action('status changed'),
    // changeTitle: action('title changed'),
    // removeTask: action('task deleted')
};

