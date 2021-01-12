import {tasksReducer} from './tasks-reducer';
import {todoListReducer} from './todolist-reducer';
import {combineReducers, createStore} from 'redux';


export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
window.store = store
