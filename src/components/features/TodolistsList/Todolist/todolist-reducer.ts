import {APITodolist, ResultCodes, TodolistType} from '../../../../api/todolistsAPI';
import {setAppError, setAppStatus} from '../../../App/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/error-utils';
import {Dispatch} from 'redux';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type EntityStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: EntityStatusType
}

export type AddTodolistType = ReturnType<typeof addTodoListAC>
export type RemoveTodolistType = ReturnType<typeof removeTodoListAC>
export type setTodlistsType = ReturnType<typeof setTodolists>

type ActionTodolistType =
    ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | AddTodolistType
    | RemoveTodolistType
    | setTodlistsType
    | ReturnType<typeof setTodolistEntityStatus>


const initialState: Array<TodolistDomainType> = []
//TODO SLICE
const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        removeTodoListAC: (state, action: PayloadAction<{ todoListID: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            state.splice(index, 1)
        },
        addTodoListAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolist.id)
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodoListFilterAC: (state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) => {
        },
        changeTodoListTitleAC: (state, action: PayloadAction<{ id: string, title: string }>) => {
        },
        setTodolistEntityStatus: (state, action: PayloadAction<{ entityStatus: EntityStatusType, id: string }>) => {
        },
        setTodolists: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
        }
    }
})

export const todoListReducer = (state: TodolistDomainType[] = initialState, action: ActionTodolistType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case 'SET-TODOLISTS':
            return action.todolists.map(t => ({...t, filter: 'all', entityStatus: 'idle'}))
        case 'SET-TODOLIST-ENTITY-STATUS':
            return state.map(t => t.id === action.id ? {...t, entityStatus: action.entityStatus} : t)
        default:
            return state;
    }
}
//actions
// export const removeTodoListAC = (todoListID: string) => ({type: 'REMOVE-TODOLIST', id: todoListID} as const);
// export const addTodoListAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const);
// export const changeTodoListFilterAC = (filter: FilterValuesType, id: string) => ({
//     type: 'CHANGE-TODOLIST-FILTER',
//     id,
//     filter
// } as const)
// export const changeTodoListTitleAC = (id: string, title: string) => ({
//     type: 'CHANGE-TODOLIST-TITLE',
//     id,
//     title
// } as const)
// export const setTodolistEntityStatus = (entityStatus: EntityStatusType, id: string) =>
//     ({type: 'SET-TODOLIST-ENTITY-STATUS', entityStatus, id} as const)
// export const setTodolists = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
//thunks
export const getTodolists = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    APITodolist.getTodolist()
        .then(res => {
            dispatch(setTodolists(res.data))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
        .catch(err => {
            if (err.response.status === 401) {
                dispatch(setAppError({error: 'Please Sign In'}))
            } else {
                dispatch(setAppError(err.message))
            }
            dispatch(setAppStatus({status: 'failed'}))
        })
}
export const createTodolist = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    APITodolist.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === ResultCodes.Success) {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError<{}>(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const deleteTodolist = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(setTodolistEntityStatus('loading', id))
    APITodolist.deleteTodolist(id)
        .then(res => {
            if (res.data.resultCode === ResultCodes.Success) {
                dispatch(removeTodoListAC(id))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                dispatch(setAppError({error: res.data.messages[0]}))
                dispatch(setAppStatus({status: 'failed'}))
                dispatch(setTodolistEntityStatus('failed', id))
            }
        })
        .catch(err => {
            dispatch(setAppError(err.message))
            dispatch(setAppStatus({status: 'failed'}))
            dispatch(setTodolistEntityStatus('failed', id))
        })
}
export const changeTodolistTitleTC = (id: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    APITodolist.updateTodolist(id, newTitle)
        .then(res => {
            if (res.data.resultCode === ResultCodes.Success) {
                dispatch(changeTodoListTitleAC(id, newTitle))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError<{}>(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

