import {setAppStatus} from '../../App/app-reducer';
import {authAPI, FieldsErrorsType, LoginRequestPayloadType, ResultCodes} from '../../../api/todolistsAPI';
import {handleServerAppError} from '../../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export const login = createAsyncThunk<undefined, LoginRequestPayloadType, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldsErrorsType> }
}>
('auth/login', async (data, thunkAPI) => {
    try {
        let res = await authAPI.login(data)
        if (res.data.resultCode === ResultCodes.Success) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
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

export const logout = createAsyncThunk('auth/logout', async (params, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        let res = await authAPI.logOut()
        if (res.data.resultCode === ResultCodes.Success) {
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (err) {
        handleServerAppError(err, dispatch)
        return rejectWithValue(err)
    }
})

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
        builder.addCase(login.fulfilled, (state) => {
            state.isLogged = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isLogged = false
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLogged} = slice.actions



