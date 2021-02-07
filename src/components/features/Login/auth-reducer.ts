import {setAppStatus, setInitializeApp} from '../../App/app-reducer';
import {authAPI, LoginRequestPayloadType, ResultCodes} from '../../../api/todolistsAPI';
import {handleServerAppError} from '../../../utils/error-utils';
import {Dispatch} from 'redux';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    isLogged: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLogged: (state, action: PayloadAction<{ isLogged: boolean }>) => {
            state.isLogged = action.payload.isLogged
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLogged} = slice.actions


export const login = (data: LoginRequestPayloadType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        let res = await authAPI.login(data)
        if (res.data.resultCode === ResultCodes.Success) {
            dispatch(setIsLogged({isLogged: true}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError<{ userId: number }>(res.data, dispatch)
        }
    } catch (err) {
        handleServerAppError(err, dispatch)
    }
}

export const logOut = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        let res = await authAPI.logOut()
        if (res.data.resultCode === ResultCodes.Success) {
            dispatch(setIsLogged({isLogged: false}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        handleServerAppError(err, dispatch)
    }
}

export const initializeApp = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCodes.Success) {
            dispatch(setIsLogged({isLogged: true}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
        }
    } catch (err) {
        handleServerAppError(err, dispatch)
    } finally {
        dispatch(setInitializeApp())
    }
}

