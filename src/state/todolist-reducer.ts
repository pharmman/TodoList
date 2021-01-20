import {APITodolist, TodolistType} from '../api/todolistsAPI';
import {ActionTasksType} from './tasks-reducer';
import {ThunkAction} from 'redux-thunk';
import {AppRootStateType} from './store';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
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


export type SetTodolistsActionType = ReturnType<typeof setTodolists>

type ActionTodolistType =
    ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType

type CommonActionTypes = ActionTodolistType | ActionTasksType

export type ThunkType = ThunkAction<void, AppRootStateType, unknown, CommonActionTypes>

const initialState: Array<TodolistDomainType> = []

export const todoListReducer = (state: TodolistDomainType[] = initialState, action: ActionTodolistType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const filterAll:FilterValuesType = 'all'
            const newTodolist = {...action.todolist, filter: filterAll}
            return [newTodolist, ...state]
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
        case 'SET-TODOLISTS':
            return action.todolists.map(t => ({...t, filter: 'all'}))
        default:
            return state;
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodolistActionType => ({
    type: 'REMOVE-TODOLIST',
    id: todoListID
});
export const addTodoListAC = (todolist:TodolistType): AddTodolistActionType => ({
    type: 'ADD-TODOLIST',
    todolist
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

export const setTodolists = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

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

export const changeTodolistTitleTC = (id:string, newTitle:string):ThunkType => (dispatch) => {
    APITodolist.updateTodolist(id, newTitle)
        .then(res => {
           dispatch(changeTodoListTitleAC(id, newTitle))
        })
}

