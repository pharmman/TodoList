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

export const TodolistsList: React.FC = () => {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)

    useEffect(() => {
        dispatch(getTodolists())
    }, [])


    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(value, todoListID))
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
                                    todoListId={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    changeFilter={changeFilter}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>
}