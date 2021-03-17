import {store} from '../app/store';
import {FieldsErrorsType} from '../api/types';

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
export type ThunkErrorType = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldsErrorsType> } }