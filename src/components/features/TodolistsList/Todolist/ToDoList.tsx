import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../AddItemForm/AddItemForm';
import {EditableSpan} from '../../../EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../App/store';
import {
    createTaskTC,
    getTasks,
    removeTaskTC,
    updateTaskTC
} from './tasks-reducer';
import {Task} from './Task/Task';
import {FilterValuesType} from './todolist-reducer';
import {TaskStatuses, TaskType} from '../../../../api/todolistsAPI';

type TodoListPropsType = {
    todoListId: string
    filter: FilterValuesType
    title: string,
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export const ToDoList: React.FC<TodoListPropsType> = React.memo(({
                                                                     todoListId,
                                                                     filter,
                                                                     title,
                                                                     changeFilter,
                                                                     removeTodoList,
                                                                     changeTodoListTitle
                                                                 }) => {
    console.log('ToDoList called')
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoListId])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks(todoListId))
    }, [dispatch, todoListId])

    let tasksForTodoList: Array<TaskType> = tasks

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.status !== TaskStatuses.Completed);
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const onSetAllFilterClick = useCallback(
        () => changeFilter('all', todoListId), [todoListId, changeFilter]);
    const onSetActiveFilterClick = useCallback(
        () => changeFilter('active', todoListId), [todoListId, changeFilter]);
    const onSetCompletedFilterClick = useCallback(
        () => changeFilter('completed', todoListId), [todoListId, changeFilter]);

    const deleteTodoList = () => removeTodoList(todoListId);

    const addTask = useCallback((title: string) => {
        dispatch(createTaskTC(todoListId, title))
    }, [todoListId, dispatch])

    const localChangeTodoListTitle = useCallback((title: string) => {
        changeTodoListTitle(todoListId, title)
    }, [todoListId, changeTodoListTitle])

    const removeTask = useCallback((taskId: string) => dispatch(removeTaskTC(todoListId, taskId)), [todoListId, dispatch]);

    const changeTitle = useCallback((title: string, taskId: string) => {
        dispatch(updateTaskTC(todoListId, taskId, {title: title}))
    }, [todoListId, dispatch])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        dispatch(updateTaskTC(todoListId, taskId, e.currentTarget.checked ?
            {status:TaskStatuses.Completed}
            :
            {status:TaskStatuses.New}))
    }, [todoListId, dispatch]);


    const currentTasks = tasksForTodoList.map(t => {
        return (
            <span key={t.id}>
                <Task task={t} removeTask={removeTask} changeTitle={changeTitle} changeStatus={changeStatus}/>
            </span>
        )
    })

    return (
        <div className="App">
            <div>
                <h3><EditableSpan title={title} changeTitle={localChangeTodoListTitle}/>
                    <IconButton onClick={deleteTodoList} color={'primary'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul style={{listStyle: 'none', padding: '0'}}>
                    {currentTasks}
                </ul>
                <div>
                    <Button
                        style={{margin: '3px'}}
                        variant={filter === 'all' ? 'outlined' : 'contained'}
                        size={'small'}
                        color={'primary'}
                        onClick={onSetAllFilterClick}>All
                    </Button>
                    <Button
                        style={{margin: '3px'}}
                        variant={filter === 'active' ? 'outlined' : 'contained'}
                        size={'small'}
                        color={'primary'}
                        onClick={onSetActiveFilterClick}>Active
                    </Button>
                    <Button
                        style={{margin: '3px'}}
                        variant={filter === 'completed' ? 'outlined' : 'contained'}
                        size={'small'}
                        color={'primary'}
                        onClick={onSetCompletedFilterClick}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
})

