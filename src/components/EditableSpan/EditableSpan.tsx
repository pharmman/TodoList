import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';
import {EntityStatusType} from '../features/TodolistsList/Todolist/todolist-reducer';

export type EditableSpanPropsType = {
    title: string
    changeTitle: (title:string) => void
    entityStatus?: EntityStatusType
}

export const    EditableSpan = React.memo ( (props: EditableSpanPropsType) => {
    console.log('EditableSpan called')
    const onEditMode = () => {
        setEditMode(true)
    };
    const offEditMode = () => {
        setEditMode(false)
        if(title.trim()) {
            props.changeTitle(title.trim());
        }
    };

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState(props.title)
    return (editMode ?
            <TextField onBlur={offEditMode} onChange={onChangeTitle} autoFocus value={title}/>
            :
            <span onDoubleClick={props.entityStatus === 'loading'? () =>{} : onEditMode}>{props.title}</span>
    )
})