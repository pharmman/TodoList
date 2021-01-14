import {v1} from 'uuid';
import {TodolistType} from '../api/todolistsAPI';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

type ActionType =
    ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: Array<TodolistDomainType> = []

export const todoListReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodolistDomainType = {
                id: action.id,
                title: action.title,
                filter: 'all',
                order: 1,
                addedDate: ''
            }
            return [newTodoList, ...state];
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...state]
            }
            return state
        }
        default:
            return state;
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodolistActionType => ({
    type: 'REMOVE-TODOLIST',
    id: todoListID
});
export const addTodoListAC = (todoListTitle: string): AddTodolistActionType => ({
    type: 'ADD-TODOLIST',
    title: todoListTitle,
    id: v1()
});
export const changeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    }
}
export const changeTodoListTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    }
}