import {Dispatch} from 'redux';
import {AxiosError} from 'axios';
import {appActions} from '../components/features/CommonActions/commonApplicationActions'
import {ResponseType} from '../api/types';

const {setAppStatus, setAppError} = appActions

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length > 0) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: 'Failed'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch) => {
    dispatch(setAppError(error.message ? {error: error.message} : {error: 'Some error occurred'}))
    dispatch(setAppStatus({status: 'failed'}))
}