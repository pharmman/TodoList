import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type PropsType = {
    id: string
    filter: FilterValuesType
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (taskTitle: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export function ToDoList(props: PropsType) {


    const onSetAllFilterClick = () => props.changeFilter('all', props.id);
    const onSetActiveFilterClick = () => props.changeFilter('active', props.id);
    const onSetCompletedFilterClick = () => props.changeFilter('completed', props.id);
    const deleteTodoList = () => props.removeTodoList(props.id);
    const addTask = (title: string) => {
        debugger
        props.addTask(title, props.id);
    }
    const changeTodoListTitle = (title: string) => {props.changeTodoListTitle(props.id, title)}


    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id);
        const changeTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        };
        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}><
                input
                type="checkbox"
                onChange={changeStatus}
                checked={t.isDone}/>
                <EditableSpan changeTitle={changeTitle} title={t.title}/>
                {/*<span>{t.title}</span>*/}
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    return (
        <div className="App">
            <div>
                <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    <button onClick={deleteTodoList}>Delete</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active' : ''}
                    onClick={onSetAllFilterClick}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active' : ''}
                    onClick={onSetActiveFilterClick}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active' : ''}
                    onClick={onSetCompletedFilterClick}>Completed
                </button>
            </div>
        </div>
</div>
)
}