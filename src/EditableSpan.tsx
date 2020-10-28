import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title:string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
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
            // <input onBlur={offEditMode} onChange={onChangeTitle} autoFocus value={title}/>
            <TextField onBlur={offEditMode} onChange={onChangeTitle} autoFocus value={title} />
            :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}