import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux';
import {tasksReducer} from '../../components/features/TodolistsList/Todolist/tasks-reducer';
import {todoListReducer} from '../../components/features/TodolistsList/Todolist/todolist-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../../api/todolistsAPI';
import {AppRootStateType, rootReducer} from '../../components/App/store';
import {appReducer} from '../../components/App/app-reducer';
import {authReducer} from '../../components/features/Login/auth-reducer';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import {HashRouter} from 'react-router-dom';


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
                id: v1(), title: 'React Book', status: TaskStatuses.Completed, addedDate: '',
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
        status: 'idle'
    }
};

const storybookRootReducer: typeof rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer
})


// const storybookStore = createStore(storybookRootReducer, initialState, applyMiddleware(thunk))
const storybookStore = configureStore({
    preloadedState:initialState,
    reducer: storybookRootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (
        <HashRouter>
            <Provider store={storybookStore}>
                {storyFn()}
            </Provider>
        </HashRouter>
    )
}