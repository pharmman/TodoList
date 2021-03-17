import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {TodolistDomainType} from './Todolist/todolist-reducer';
import {Grid} from '@material-ui/core';
import {AddItemForm, AddItemFormSubmitHelpersType} from '../../AddItemForm/AddItemForm';
import {ToDoList} from './Todolist/ToDoList';
import {Redirect} from 'react-router-dom';
import {authSelectors} from '../Auth';
import {todolistActions} from './index';
import {useActions, useAppDispatch} from '../../../utils/redux-utils';
import {AppRootStateType} from '../../../utils/types';

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo}) => {
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const {getTodolists} = useActions(todolistActions)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn || demo) {
            return
        }
        getTodolists()
    }, [isLoggedIn, demo, getTodolists])


    const addTodoList = useCallback(async (title: string, helper: AddItemFormSubmitHelpersType) => {
        // createTodolist(title)


        const thunk = todolistActions.createTodolist(title)
        const action = await dispatch(thunk)

        if (todolistActions.createTodolist.rejected.match(action)) {
            if (action.payload?.errors?.length) {
                const error = action.payload?.errors[0]
                helper.setError(error)
            } else {
                helper.setError('Some error occurred')
            }
        } else {
            helper.setTitle('')
        }


    }, [dispatch])


    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }
    return <>
        <Grid container style={{padding: '15px'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={4} style={{flexWrap: 'nowrap', overflowX: 'scroll'}}>
            {
                todoLists.map(tl => {
                    return (
                        <Grid item key={tl.id}>
                            <div style={{width: '300px'}}>
                                <ToDoList
                                    key={tl.id}
                                    todolist={tl}
                                    demo={demo}
                                />
                            </div>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>
}