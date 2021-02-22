import {tasksReducer} from '../features/TodolistsList/Todolist/tasks-reducer';
import {todoListReducer} from '../features/TodolistsList/Todolist/todolist-reducer';
import {appReducer} from './app-reducer';
import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from '../features/Login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';


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
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()
