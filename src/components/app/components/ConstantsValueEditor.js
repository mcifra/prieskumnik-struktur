import React from 'react';

function ConstantsValueEditor(props) {
    let constants = Object.keys(props.constants);
    return (
        <div>
            {constants.map((cons, index) =>
                <div>
                    <label>{cons}</label>
                    <select value={props.constants[cons].value}
                            onChange={(e) => props.onInputChange(e.target.value, cons)}>
                        <option value={''}>{''}</option>
                        {[...props.domain].map((item, index) =>
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