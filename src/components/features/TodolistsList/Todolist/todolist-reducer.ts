import {APITodolist, TodolistType} from '../../../../api/todolistsAPI';
import {ActionTasksType} from './tasks-reducer';
import {ThunkAction} from 'redux-thunk';
import {AppRootStateType} from '../../../App/store';

//types
export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

type ActionTodolistType =
    ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodolists>

export type CommonActionTypes = ActionTodolistType | ActionTasksType

export type ThunkType = ThunkAction<void, AppRootStateType, unknown, CommonActionTypes>

const initialState: Array<TodolistDomainType> = []

export const todoListReducer = (state: TodolistDomainType[] = initialState, action: ActionTodolistType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case 'SET-TODOLISTS':
            return action.todolists.map(t => ({...t, filter: 'all'}))
        default:
            return state;
    }
}
//actions
export const removeTodoListAC = (todoListID: string) => ({type: 'REMOVE-TODOLIST',id: todoListID} as const);
export const addTodoListAC = (todolist:TodolistType) => ({type: 'ADD-TODOLIST',todolist}as const);
export const changeTodoListFilterAC = (filter: FilterValuesType, id: string) => ({type: 'CHANGE-TODOLIST-FILTER',id,filter} as const)
export const changeTodoListTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE',id,title} as const)
export const setTodolists = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
//thunks
export const getTodolists = ():ThunkType => dispatch => {
    APITodolist.getTodolist()
        .then(res => {
            dispatch(setTodolists(res.data))
        })
}
export const createTodolist = (title: string):ThunkType => dispatch => {
    APITodolist.createTodolist(title)
        .then(res => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}
export const deleteTodolist = (id:string):ThunkType => dispatch => {
    APITodolist.deleteTodolist(id)
        .then(res => {
            dispatch(removeTodoListAC(id))
        })
}
export const changeTodolistTitleTC = (id:string, newTitle:string):ThunkType => dispatch => {
    APITodolist.updateTodolist(id, newTitle)
        .then(res => {
           dispatch(changeTodoListTitleAC(id, newTitle))
        })
}

