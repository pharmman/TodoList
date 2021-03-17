import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authAPI, ResultCodes} from '../../api/todolistsAPI';
import {handleServerAppError} from '../../utils/error-utils';
import {setIsLogged} from '../features/Auth/auth-reducer';


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppErrorType = null | string
export type appReducerInitialState = typeof initialState

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as AppErrorType,
    isInitialized: false as boolean,
}

 const initializeApp = createAsyncThunk('app/initializeApp', async (params, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    const res = await authAPI.me()
    try {
        if (res.data.resultCode === ResultCodes.Success) {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setIsLogged({isLogged: true}))
        } else {
            dispatch(setAppStatus({status: 'failed'}))
        }
    } catch (err) {
        handleServerAppError(err, dispatch)
        return rejectWithValue(err)
    }
})

export const asyncActions = {
    initializeApp
}

export const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: AppErrorType }>) => {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state) => {
            state.isInitialized = true
        })

    }
})

const appReducer = slice.reducer
const {setAppStatus} = slice.actions