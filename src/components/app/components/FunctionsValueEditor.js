import React from 'react';

function FunctionsValueEditor(props) {
    let functions = Object.keys(props.functions);
    console.log(functions);
    return (
        <div>
            {functions.map((name, index) =>
                <div>
                    <label>{name}</label>
                    <input type='text' onChange={(e) => props.onInputChange(e.target.value, name)}/>
                    <span>{props.functions[name].error}</span>
                </div>
            )}
        </div>
    )
}

export default FunctionsValueEditor;