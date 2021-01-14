import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../state/tasks-reducer';
import {todoListReducer} from '../../state/todolist-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../../api/todolistsAPI';

type AppRootStateType = ReturnType<typeof storybookRootReducer>

const initialState:AppRootStateType = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all",  addedDate: '', order: 1},
        {id: "todolistId2", title: "What to buy", filter: "all",  addedDate: '', order: 1}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,  addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'},
            {id: v1(), title: "JS", status: TaskStatuses.Completed,  addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,  addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed,  addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'}
        ]
    }
};

const storybookRootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})


const storybookStore = createStore(storybookRootReducer,initialState)


export const ReduxStoreProviderDecorator = (storyFn:any) => {
    return (
        <Provider store={storybookStore}>{storyFn()}</Provider>
    )
}