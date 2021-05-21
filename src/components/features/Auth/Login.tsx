import React from 'react';
import {FormikHelpers, useFormik} from 'formik';
import {login} from './auth-reducer';
import {useSelector} from 'react-redux';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import {selectIsLoggedIn} from './selectors';
import {useAppDispatch} from '../../../utils/redux-utils';

type InitialValuesType = {
    email?: string | null,
    password?: string | null,
    rememberMe?: boolean
}

type FormikValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
}

const validate = (values: InitialValuesType) => {
    const errors: InitialValuesType = {};

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 4) {
        errors.password = 'Must be 4 characters or more';
    }
    return errors
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate,
        onSubmit: async (values, formikHelpers: FormikHelpers<FormikValuesType>) => {
            const action = await dispatch(login(values))
            if (login.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload?.fieldsErrors[0]
                formikHelpers.setFieldError(error.field, error.error)
                }
            }
        },
    });
    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }
    return (
        <Grid container justify="center">
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'} rel={'noopener noreferrer'}>here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                id="email"
                                type="email"
                                placeholder={'Email'}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{color: 'red'}}>{formik.errors.email}</div>
                            ) : null}

                            <TextField label={'Password'} id="password"
                                       type="password" {...formik.getFieldProps('password')} />
                            {formik.touched.password && formik.errors.password ? (
                                <div style={{color: 'red'}}>{formik.errors.password}</div>
                            ) : null}

                            <FormControlLabel label={'Remember ME'} id="rememberMe"
                                              control={<Checkbox/>} {...formik.getFieldProps('rememberMe')} />
                            <Button type="submit" variant={'contained'} color={'primary'}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>


    )
}