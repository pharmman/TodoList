import {tasksReducer} from '../features/TodolistsList/Todolist/tasks-reducer';
import {todoListReducer} from '../features/TodolistsList/Todolist/todolist-reducer';
import {appReducer} from './app-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from '../features/Login/auth-reducer';


export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
