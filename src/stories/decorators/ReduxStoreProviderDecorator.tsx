import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux';
import {tasksReducer} from '../../components/features/TodolistsList';
import {todoListReducer} from '../../components/features/TodolistsList';
import {v1} from 'uuid';
import {rootReducer} from '../../app/store';
import {appReducer} from '../../components/features/Application/';
import {authReducer} from '../../components/features/Auth';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import {HashRouter} from 'react-router-dom';
import {AppRootStateType} from '../../utils/types';
import {TaskPriorities, TaskStatuses} from '../../api/types';


const initialState: AppRootStateType = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 1, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 1, entityStatus: 'idle'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS',
                status: TaskStatuses.Completed, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: v1(), title: 'React Book', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            }
        ]
    },
    auth: {
        isLogged: true,
    },
    app: {
        isInitialized: true,
        error: null,
        status: 'succeeded'
    }
};

const storybookRootReducer: typeof rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer
})


const storybookStore = configureStore({
    preloadedState:initialState,
    reducer: storybookRootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (
        <HashRouter>
            <Provider store={storybookStore}>
                {storyFn() }
            </Provider>
        </HashRouter>
    )
}