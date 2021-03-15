import {asyncActions as tasksAsyncActions} from './Todolist/tasks-reducer'
import {slice} from './Todolist/todolist-reducer'
import {asyncActions as todolistAsyncActions} from './Todolist/todolist-reducer'
import { TodolistsList } from './TodolistsList'


const todolistActions = {
    ...todolistAsyncActions,
    ...slice.actions
}

const tasksActions = {
    ...tasksAsyncActions,
}

export {
    tasksActions,
    todolistActions,
    TodolistsList
}