import React from 'react';

function VariablesValue(props) {
    return (
        <div>
            <label>Premenne</label>
            <input type='text' value={props.value} onChange={(e) => props.onInputChange(e.target.value)}/>
            <span>{props.error}</span>
        </div>
    )
}

export default VariablesValue;