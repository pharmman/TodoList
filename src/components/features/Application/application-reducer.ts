import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authAPI} from '../../../api/todolistsAPI';
import {handleServerAppError} from '../../../utils/error-utils';
import {authActions} from '../Auth';
import {ResultCodes} from '../../../api/types';
import {appActions} from '../CommonActions/commonApplicationActions';


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppErrorType = null | string
export type appReducerInitialState = typeof initialState

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as AppErrorType,
    isInitialized: false as boolean,
}

const initializeApp = createAsyncThunk('application/initializeApp', async (params, {dispatch, rejectWithValue}) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    const res = await authAPI.me()
    try {
        if (res.data.resultCode === ResultCodes.Success) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            dispatch(authActions.setIsLogged({isLogged: true}))
        } else {
            dispatch(appActions.setAppStatus({status: 'failed'}))
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
    reducers: {},
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state) => {
            state.isInitialized = true
        })
        builder.addCase(appActions.setAppStatus, (state, action) => {
            state.status = action.payload.status
        })
        builder.addCase(appActions.setAppError, (state, action) => {
            state.error = action.payload.error
        })
    }
})

