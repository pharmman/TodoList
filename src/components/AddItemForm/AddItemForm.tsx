import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';
import {EntityStatusType} from '../features/TodolistsList/Todolist/todolist-reducer';

export type AddItemFormSubmitHelpersType = { setError: (error: string) => void, setTitle: (title: string) => void }

export type AddItemFormPropsType = {
    addItem: (title: string, helper: AddItemFormSubmitHelpersType) => void
    entityStatus?: EntityStatusType
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onchangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }
        setTitle(e.currentTarget.value)
    };

    const onKeyPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
            if (e.key === 'Enter') {
                addItem()
            }
        }
    }

    const addItem = async () => {
        if (title.trim() !== '') {
            props.addItem(title, {setError, setTitle})
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <TextField variant={'outlined'}
                       value={title}
                       onChange={onchangeTitleHandler}
                       onKeyPress={onKeyPressEnterHandler}
                       error={!!error}
                       label={'Title'}
                       helperText={error}
                       disabled={props.entityStatus === 'loading'}
            /> {
            !error && <IconButton color={'primary'} onClick={addItem} disabled={props.entityStatus === 'loading'}>
                <AddBox/>
            </IconButton>
        }
        </div>
    )
})