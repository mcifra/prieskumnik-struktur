import React from 'react';

function TextInput(props) {
    return (
        <div>
            <label htmlFor='konstanty'>{props.name}</label>
            <input type='text' id='konstanty' onChange={(e) => props.onInputChange(e.target.value)}/>
            <span>{props.error}</span>
        </div>
    )
}

export default TextInput;