import {asyncActions as tasksAsyncActions} from './Todolist/tasks-reducer'
import {slice as todolistsSlice} from './Todolist/todolist-reducer'
import {slice as tasksSlice} from './Todolist/tasks-reducer'
import {asyncActions as todolistAsyncActions} from './Todolist/todolist-reducer'
import { TodolistsList } from './TodolistsList'
import * as todolistsSelectors from './selectors'


const todolistActions = {
    ...todolistAsyncActions,
    ...todolistsSlice.actions
}

const tasksActions = {
    ...tasksAsyncActions,
}

const todoListReducer = todolistsSlice.reducer
const tasksReducer = tasksSlice.reducer

export {
    tasksActions,
    todolistActions,
    TodolistsList,
    todoListReducer,
    tasksReducer,
    todolistsSelectors
}