import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo ( function (props: AddItemFormPropsType) {
    console.log('AddItemForm Called')
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onchangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    const onKeyPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }
    }

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            {/*<input value={title}
                   onChange={onchangeTitleHandler}
                   onKeyPress={onKeyPressEnterHandler}
                   className={error ? 'error' : ''}
            />*/}
            <TextField variant={'outlined'}
                       value={title}
                       onChange={onchangeTitleHandler}
                       onKeyPress={onKeyPressEnterHandler}
                       error={!!error}
                       label={'Title'}
                       helperText={error}
            />
            <IconButton color={'primary'} onClick={addItem}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    )
})