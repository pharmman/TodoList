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
const initialState: Array<TodolistDomainType> = []
const slice = createSlice({
        name: 'todolist',
        initialState: initialState,
        reducers: {
            removeTodoListAC: (state, action: PayloadAction<{ todoListID: string }>) => {
                const index = state.findIndex(tl => tl.id === action.payload.todoListID)
                state.splice(index, 1)
            },
            addTodoListAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            },
            changeTodoListFilterAC: (state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].filter = action.payload.filter
            },
            changeTodoListTitleAC: (state, action: PayloadAction<{ id: string, title: string }>) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].title = action.payload.title
            },
            setTodolistEntityStatus: (state, action: PayloadAction<{ entityStatus: EntityStatusType, id: string }>) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].entityStatus = action.payload.entityStatus
            },
            setTodolists: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>): Array<TodolistDomainType> => {
                return action.payload.todolists.map(t => ({...t, filter: 'all', entityStatus: 'idle'}))
            }
        }
    }
)

export const todoListReducer = slice.reducer
export const {
    setTodolists,
    setTodolistEntityStatus,
    changeTodoListTitleAC,
    changeTodoListFilterAC,
    addTodoListAC,
    removeTodoListAC
} = slice.actions

export const getTodolists = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    APITodolist.getTodolist()
        .then(res => {
            dispatch(setTodolists({todolists: res.data}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
        .catch(err => {
            debugger
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
                dispatch(addTodoListAC({todolist: res.data.data.item}))
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
    dispatch(setTodolistEntityStatus({entityStatus: 'loading', id}))
    APITodolist.deleteTodolist(id)
        .then(res => {
            if (res.data.resultCode === ResultCodes.Success) {
                dispatch(removeTodoListAC({todoListID: id}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                dispatch(setAppError({error: res.data.messages[0]}))
                dispatch(setAppStatus({status: 'failed'}))
                dispatch(setTodolistEntityStatus({entityStatus: 'failed', id}))
            }
        })
        .catch(err => {
            dispatch(setAppError(err.message))
            dispatch(setAppStatus({status: 'failed'}))
            dispatch(setTodolistEntityStatus({entityStatus: 'failed', id}))
        })
}
export const changeTodolistTitleTC = (id: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    APITodolist.updateTodolist(id, newTitle)
        .then(res => {
            if (res.data.resultCode === ResultCodes.Success) {
                dispatch(changeTodoListTitleAC({ id, title: newTitle}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError<{}>(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

