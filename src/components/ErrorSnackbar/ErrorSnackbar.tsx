import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useSelector} from 'react-redux';
import {selectAppError} from '../features/Application/selectors';
import {useActions} from '../../utils/redux-utils';
import {appActions} from '../features/CommonActions/commonApplicationActions';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ErrorSnackbar() {
    const appError = useSelector(selectAppError)
    const  {setAppError} = useActions(appActions)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAppError({error: null})
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
