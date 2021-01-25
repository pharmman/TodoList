import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../AddItemForm/AddItemForm';
import {EditableSpan} from '../../../EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../App/store';
import {createTaskTC, getTasks, removeTaskTC, updateTaskTC} from './tasks-reducer';
import {Task} from './Task/Task';
import {FilterValuesType, TodolistDomainType} from './todolist-reducer';
import {TaskStatuses, TaskType} from '../../../../api/todolistsAPI';

type TodoListPropsType = {
    todolist: TodolistDomainType
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export const ToDoList: React.FC<TodoListPropsType> = React.memo(({
                                                                     todolist,
                                                                     changeFilter,
                                                                     removeTodoList,
                                                                     changeTodoListTitle,
                                                                 }) => {
    console.log('ToDoList called')
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks(todolist.id))
    }, [dispatch, todolist.id])

    let tasksForTodoList: Array<TaskType> = tasks

    if (todolist.filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.status !== TaskStatuses.Completed);
    }
    if (todolist.filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const onSetAllFilterClick = useCallback(
        () => changeFilter('all', todolist.id), [todolist.id, changeFilter]);
    const onSetActiveFilterClick = useCallback(
        () => changeFilter('active', todolist.id), [todolist.id, changeFilter]);
    const onSetCompletedFilterClick = useCallback(
        () => changeFilter('completed', todolist.id), [todolist.id, changeFilter]);

    const deleteTodoList = () => removeTodoList(todolist.id);

    const addTask = useCallback((title: string) => {
        dispatch(createTaskTC(todolist.id, title))
    }, [todolist.id, dispatch])

    const localChangeTodoListTitle = useCallback((title: string) => {
        changeTodoListTitle(todolist.id, title)
    }, [todolist.id, changeTodoListTitle])

    const removeTask = useCallback((taskId: string) => dispatch(removeTaskTC(todolist.id, taskId)), [todolist.id, dispatch]);

    const changeTitle = useCallback((title: string, taskId: string) => {
        dispatch(updateTaskTC(todolist.id, taskId, {title: title}))
    }, [todolist.id, dispatch])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        dispatch(updateTaskTC(todolist.id, taskId, e.currentTarget.checked ?
            {status: TaskStatuses.Completed}
            :
            {status: TaskStatuses.New}))
    }, [todolist.id, dispatch]);


    const currentTasks = tasksForTodoList.map(t => {
        return (
            <span key={t.id}>
                <Task entityStatus={t.entityStatus} task={t} removeTask={removeTask} changeTitle={changeTitle}
                      changeStatus={changeStatus}/>
            </span>
        )
    })

    return (
        <div className="App">
            <div>
                <h3><EditableSpan title={todolist.title} changeTitle={localChangeTodoListTitle} entityStatus={todolist.entityStatus}/>
                    <IconButton onClick={deleteTodoList} color={'primary'} disabled={todolist.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask} entityStatus={todolist.entityStatus}/>
                <ul style={{listStyle: 'none', padding: '0'}}>
                    {currentTasks}
                </ul>
                <div>
                    <Button
                        style={{margin: '3px'}}
                        variant={todolist.filter === 'all' ? 'outlined' : 'contained'}
                        size={'small'}
                        color={'primary'}
                        onClick={onSetAllFilterClick}>All
                    </Button>
                    <Button
                        style={{margin: '3px'}}
                        variant={todolist.filter === 'active' ? 'outlined' : 'contained'}
                        size={'small'}
                        color={'primary'}
                        onClick={onSetActiveFilterClick}>Active
                    </Button>
                    <Button
                        style={{margin: '3px'}}
                        variant={todolist.filter === 'completed' ? 'outlined' : 'contained'}
                        size={'small'}
                        color={'primary'}
                        onClick={onSetCompletedFilterClick}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
})

