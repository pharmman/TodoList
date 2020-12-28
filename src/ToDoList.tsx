import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from './AppWithRedux'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {Task} from './Task';

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

    let tasksForTodoList: Array<TaskType> = tasks

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone);
    }

    const onSetAllFilterClick = useCallback(
        () => changeFilter('all', todoListId), [todoListId, changeFilter]);
    const onSetActiveFilterClick = useCallback(
        () => changeFilter('active', todoListId), [todoListId, changeFilter]);
    const onSetCompletedFilterClick = useCallback(
        () => changeFilter('completed', todoListId), [todoListId, changeFilter]);

    const deleteTodoList = () => removeTodoList(todoListId);
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }, [todoListId, dispatch])
    const localChangeTodoListTitle = useCallback ( (title: string) => {
        changeTodoListTitle(todoListId, title)
    }, [todoListId, changeTodoListTitle])
    const removeTask = useCallback((taskId: string) => dispatch(removeTaskAC(taskId, todoListId)), [todoListId, dispatch]);
    const changeTitle = useCallback((title: string, taskId: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskId, title))
    }, [todoListId, dispatch])
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        dispatch(changeTaskStatusAC(todoListId, taskId, e.currentTarget.checked))
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

