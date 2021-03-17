import {createAction} from '@reduxjs/toolkit';
import {AppErrorType, RequestStatusType} from '../Application/application-reducer';


const setAppStatus = createAction<{ status: RequestStatusType }>('app/setAppStatus')
const setAppError = createAction<{ error: AppErrorType }>('app/setAppError')

export const appActions = {
    setAppError,
    setAppStatus
}