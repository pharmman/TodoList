import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../../../../EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {EntityStatusType} from '../todolist-reducer';
import {tasksActions} from '../../index';
import {useActions} from '../../../../../utils/redux-utils';
import {TaskStatuses, TaskType} from '../../../../../api/types';

export type TaskPropsType = {
    task: TaskType
    entityStatus?: EntityStatusType
}
export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             task,
                                                             entityStatus
                                                         }) => {

        const {updateTaskTC, removeTaskTC} = useActions(tasksActions)

        const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => updateTaskTC({
            todolistId: task.todoListId, taskId: task.id, model: e.currentTarget.checked ?
                {status: TaskStatuses.Completed}
                :
                {status: TaskStatuses.New}
        }), [updateTaskTC, task.id, task.todoListId])

        const onChangeTitleHandler = useCallback((title: string) =>
            updateTaskTC({
                todolistId: task.todoListId,
                taskId: task.id,
                model: {title}
            }), [task.id, updateTaskTC, task.todoListId])

        const onRemoveTaskHandler = useCallback(() => removeTaskTC({
            todolistId: task.todoListId,
            taskId: task.id
        }), [task.id, removeTaskTC, task.todoListId])

        return (
            <li style={{marginLeft: '0', position: 'relative'}}>
                <Checkbox
                    onChange={onChangeStatusHandler}
                    checked={task.status === TaskStatuses.Completed}
                    color={'primary'}
                />
                <EditableSpan changeTitle={onChangeTitleHandler} title={task.title} entityStatus={entityStatus}/>
                <IconButton style={{position: 'absolute', right:'0', top:'6px'}} size={'small'} onClick={onRemoveTaskHandler} color={'primary'} disabled={entityStatus === 'loading'}>
                    <Delete fontSize={'small'}/>
                </IconButton>
            </li>
        )
    }
)
