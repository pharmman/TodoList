import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem:(title:string) => void
}

export function AddItemForm(props:AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onchangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setTitle(e.currentTarget.value)
    };

    const onKeyPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }

    const addItem = () => {
        debugger
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <input value={title}
                   onChange={onchangeTitleHandler}
                   onKeyPress={onKeyPressEnterHandler}
                   className={error ? 'error' : ''}
            />

            <button onClick={addItem}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}