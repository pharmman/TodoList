import {tasksReducer, todoListReducer} from '../components/features/TodolistsList';
import {appReducer} from '../components/features/Application';
import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from '../components/features/Auth';
import {configureStore} from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

// @ts-ignore
window.store = store