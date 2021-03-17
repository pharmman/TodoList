import {AppRootStateType} from '../../../utils/types';

export const selectStatus = (state: AppRootStateType) => state.app.status;
export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized;
export const selectAppError = (state: AppRootStateType) => state.app.error;
