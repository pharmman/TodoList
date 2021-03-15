import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType, useActions} from '../../App/store';
import {TodolistDomainType} from './Todolist/todolist-reducer';
import {Grid, Paper} from '@material-ui/core';
import {AddItemForm} from '../../AddItemForm/AddItemForm';
import {ToDoList} from './Todolist/ToDoList';
import {Redirect} from 'react-router-dom';
import {authSelectors} from '../Auth';
import {todolistActions} from './index';

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo}) => {
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const {createTodolist, getTodolists} = useActions(todolistActions)


    useEffect(() => {
        if (!isLoggedIn || demo) {
            return
        }
        getTodolists()
    }, [isLoggedIn, demo, getTodolists])


    const addTodoList = useCallback((title: string) => {
        createTodolist(title)
    }, [createTodolist])


    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }
    return <>
        <Grid container style={{padding: '15px'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={4} style={{flexWrap:'nowrap', overflowX: 'scroll'}}>
            {
                todoLists.map(tl => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper elevation={3} style={{padding: '15px', width: '250px'}}>
                                <ToDoList
                                    key={tl.id}
                                    todolist={tl}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }

        </Grid>
    </>
}