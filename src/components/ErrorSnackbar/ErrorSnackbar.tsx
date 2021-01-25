import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {AppRootStateType} from '../App/store';
import {AppErrorType, setAppError} from '../App/app-reducer';
import {useDispatch, useSelector} from 'react-redux';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ErrorSnackbar() {
    const appError = useSelector<AppRootStateType, AppErrorType>(state => state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppError(null))
    };

    return (
        <div>
            <Snackbar open={appError !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {appError}
                </Alert>
            </Snackbar>
        </div>
    );
}
