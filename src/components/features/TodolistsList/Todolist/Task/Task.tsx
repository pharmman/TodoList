import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../../../../EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from '../../../../../api/todolistsAPI';
import {EntityStatusType} from '../todolist-reducer';

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTitle: (title: string, taskId: string) => void
    changeStatus: (e: ChangeEvent<HTMLInputElement>, taskId: string) => void
    entityStatus?: EntityStatusType
}
export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             task,
                                                             removeTask,
                                                             changeTitle,
                                                             changeStatus,
                                                             entityStatus
                                                         }) => {
    const localChangeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => changeStatus(e, task.id), [changeStatus, task.id])
    const localChangeTitle = useCallback((title: string) => changeTitle(title, task.id), [task.id, changeTitle])
    const localRemoveTask = useCallback(() => removeTask(task.id), [removeTask, task.id])
    return (
        <li style={{marginLeft: '0'}}>
            <Checkbox
                onChange={localChangeStatus}
                checked={task.status === TaskStatuses.Completed}
                color={'primary'}
            />
            <EditableSpan changeTitle={localChangeTitle} title={task.title} entityStatus={entityStatus}/>
            <IconButton onClick={localRemoveTask} color={'primary'} disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </li>
    )
})