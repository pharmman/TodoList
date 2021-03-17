import {AppRootStateType} from '../../../utils/types';

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLogged;