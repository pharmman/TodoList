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
import {AppRootStateType, useAppDispatch} from '../../App/store';
import {Redirect} from 'react-router-dom';

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
    } else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters or more';
    }

    // if (!values.email) {
    //     errors.email = 'Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address';
    // }
    return errors
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged)

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
            // dispatch(login(values))
            // formik.resetForm()
        },
    });
    if (isLogged) {
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