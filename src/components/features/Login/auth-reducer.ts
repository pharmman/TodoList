import {setAppStatus, setInitializeApp} from '../../App/app-reducer';
import {authAPI, FieldsErrorsType, LoginRequestPayloadType, ResultCodes} from '../../../api/todolistsAPI';
import {handleServerAppError} from '../../../utils/error-utils';
import {Dispatch} from 'redux';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export const login = createAsyncThunk<{ isLogged: boolean }, LoginRequestPayloadType, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldsErrorsType> }
}>
('auth/login', async (data, thunkAPI) => {
    try {
        let res = await authAPI.login(data)
        if (res.data.resultCode === ResultCodes.Success) {
            // thunkAPI.dispatch(setIsLogged({isLogged: true}))
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {isLogged: true}
        } else {
            handleServerAppError<{ userId: number }>(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        const error: AxiosError = err
        handleServerAppError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const _login = (data: LoginRequestPayloadType) => async (dispatch: Dispatch) => {
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

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false
    },
    reducers: {
        setIsLogged: (state, action: PayloadAction<{ isLogged: boolean }>) => {
            state.isLogged = action.payload.isLogged
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
                state.isLogged = action.payload.isLogged
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLogged} = slice.actions
//Thunks


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

