import {TaskType} from './AppWithRedux';
import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTitle: (title: string, taskId: string) => void
    changeStatus: (e: ChangeEvent<HTMLInputElement>, taskId: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             task,
                                                             removeTask,
                                                             changeTitle,
                                                             changeStatus
                                                         }) => {
    const localChangeStatus = useCallback ( (e: ChangeEvent<HTMLInputElement>) => changeStatus(e, task.id), [changeStatus, task.id])
    const localChangeTitle = useCallback((title: string) => changeTitle(title, task.id), [task.id, changeTitle])
    const localRemoveTask = useCallback ( () => removeTask(task.id), [removeTask, task.id])
    return (
        <li style={{marginLeft: '0'}} className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                onChange={localChangeStatus}
                checked={task.isDone}
                color={'primary'}
            />
            <EditableSpan changeTitle={localChangeTitle} title={task.title}/>
            <IconButton onClick={localRemoveTask} color={'primary'}>
                <Delete/>
            </IconButton>
        </li>
    )
})