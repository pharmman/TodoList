import {APITodolist} from '../../../../api/todolistsAPI';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/error-utils';
import {ThunkErrorType} from '../../../../utils/types';
import {appActions} from '../../CommonActions/commonApplicationActions';
import {ResultCodes, TodolistType} from '../../../../api/types';
import {authActions} from '../../Auth';

//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type EntityStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: EntityStatusType
}

const {setAppStatus, setAppError} = appActions

const getTodolists = createAsyncThunk('todolist/getTodolist',
    async (param, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        const res = await APITodolist.getTodolist()
        try {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {todolists: res.data}
        } catch (err) {
            if (err.response.status === 401) {
                dispatch(setAppError({error: 'Please Sign In'}))
            } else {
                dispatch(setAppError(err.message))
            }
            dispatch(setAppStatus({status: 'failed'}))
            return rejectWithValue(err)
        }
    })
const createTodolist = createAsyncThunk<{ todolist: TodolistType }, string,
    ThunkErrorType>('todolist/createTodolist',
    async (title, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        const res = await APITodolist.createTodolist(title)
        try {
            if (res.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}))
                return ({todolist: res.data.data.item})
            } else {
                handleServerAppError<{}>(res.data, dispatch)
                return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue({errors: [err.message], fieldsErrors: undefined})
        }
    })
const deleteTodolist = createAsyncThunk('todolist/deleteTodolist',
    async (id: string, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        dispatch(setTodolistEntityStatus({entityStatus: 'loading', id}))
        const res = await APITodolist.deleteTodolist(id)
        try {
            if (res.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}))
                return {todoListID: id}
            } else {
                dispatch(setAppError({error: res.data.messages[0]}))
                dispatch(setAppStatus({status: 'failed'}))
                dispatch(setTodolistEntityStatus({entityStatus: 'failed', id}))
                return rejectWithValue({})
            }
        } catch (err) {
            dispatch(setAppError(err.message))
            dispatch(setAppStatus({status: 'failed'}))
            dispatch(setTodolistEntityStatus({entityStatus: 'failed', id}))
            return rejectWithValue(err)
        }
    })
const changeTodolistTitle = createAsyncThunk('todolist/changeTodolistTitle',
    async (param: { id: string, newTitle: string }, {dispatch, rejectWithValue}) => {
        const {id, newTitle} = param
        dispatch(setAppStatus({status: 'loading'}))
        const res = await APITodolist.updateTodolist(id, newTitle)
        try {
            if (res.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}))
                return {id, title: newTitle}
            } else {
                handleServerAppError<{}>(res.data, dispatch)
                return rejectWithValue({})
            }
        } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(err)
        }
    })

export const asyncActions = {
    getTodolists,
    createTodolist,
    deleteTodolist,
    changeTodolistTitle
}

export const slice = createSlice({
        name: 'todolist',
        initialState: [] as Array<TodolistDomainType>,
        reducers: {
            changeTodoListFilter: (state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].filter = action.payload.filter
            },
            setTodolistEntityStatus: (state, action: PayloadAction<{ entityStatus: EntityStatusType, id: string }>) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].entityStatus = action.payload.entityStatus
            },
        },
        extraReducers: builder => {
            builder.addCase(getTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(t => ({...t, filter: 'all', entityStatus: 'idle'}))
            })
            builder.addCase(createTodolist.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            builder.addCase(deleteTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todoListID)
                state.splice(index, 1)
            })
            builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].title = action.payload.title
            })
            builder.addCase(authActions.logout.fulfilled, (state) => {
                state.length = 0
            })
        }
    }
)

export const {
    setTodolistEntityStatus,
    changeTodoListFilter,
} = slice.actions


