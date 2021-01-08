import {combineReducers, createStore} from 'redux'
import {tasksReducer} from './tasks-reducer';
import {todoListReducer} from './todolist-reducer';


const rootReducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

export const store = createStore(rootReducers)

export type AppRootStateType = ReturnType<typeof rootReducers>

// @ts-ignore
window.store = store
bla