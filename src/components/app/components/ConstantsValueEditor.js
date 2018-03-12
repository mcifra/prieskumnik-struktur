import React from 'react';

function ConstantsValueEditor(props) {
    let constants=Object.keys(props.constants);
    let domain=[...props.domain];
    return (
        <div>
            {constants.map((cons, index)=>
                <div>
                    <label>{cons}</label>
                    <select value={props.constants[cons].value} onChange={(e) => props.onInputChange(e.target.value, cons)}>
                        {domain.map((item,index)=>
                            <option value={item}>{item}</option>
                        )}
                    </select>
                </div>
            )}
            <span>{props.error}</span>
        </div>
    )
}

export default ConstantsValueEditor;