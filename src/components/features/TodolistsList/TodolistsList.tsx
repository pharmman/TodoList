import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../App/store';
import {
    changeTodoListFilterAC,
    changeTodolistTitleTC,
    createTodolist,
    deleteTodolist,
    FilterValuesType,
    getTodolists,
    TodolistDomainType
} from './Todolist/todolist-reducer';
import {Grid, Paper} from '@material-ui/core';
import {AddItemForm} from '../../AddItemForm/AddItemForm';
import {ToDoList} from './Todolist/ToDoList';
import {Redirect} from 'react-router-dom';

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo}) => {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged)


    useEffect(() => {
        if (!isLoggedIn || demo) {
            return
        }
        dispatch(getTodolists())
    }, [isLoggedIn, dispatch, demo])

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC({filter: value, id: todoListID}))
    }, [dispatch])


    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(deleteTodolist(todoListID))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todoListId, title))
    }, [dispatch])


    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }
    return <>
        <Grid container style={{padding: '15px'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={4}>
            {
                todoLists.map(tl => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper elevation={3} style={{padding: '15px'}}>
                                <ToDoList
                                    key={tl.id}
                                    changeFilter={changeFilter}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}
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