import React from 'react';

function renderFunctionValueSelect(functionName, functionValues, params, domain, onChange) {
    let value = functionValues.get(JSON.stringify(params));
    if (value === undefined)
        value = '';
    return (
        <select onChange={(e) => onChange(params.concat([e.target.value]), functionName)} value={value}>
            <option value=''>{''}</option>
            {domain.map(item =>
                <option value={item}>{item}</option>
            )}
        </select>
    )
}

function RelationalTable(props) {
    let domain = [...props.domain];
    if (props.arity > 2)
        return <p>Nepodporovana arita</p>;
    let arity1 = (
        <tr>
            <td>{''}</td>
            {domain.map((item, index) =>
                <td>
                    {props.type === 'PREDICATE' ? (
                        <input type='checkbox'
                               onChange={(e) => props.onInputChange([item], props.name, e.target.checked)}
                               checked={props.value.findIndex((e) => JSON.stringify(e) === JSON.stringify([item])) > -1}/>
                    ) : (
                        renderFunctionValueSelect(props.name, props.value, [item], domain, props.onInputChange)
                    )}
                </td>
            )}
        </tr>
    );

    let arity2 = domain.map((item, index) =>
        <tr>
            <th>{item}</th>
            {domain.map((item2, index2) =>
                <td>
                    {props.type === 'PREDICATE' ? (
                        <input type='checkbox'
                               onChange={(e) => props.onInputChange([item,item2], props.name, e.target.checked)}
                               checked={props.value.findIndex((e) => JSON.stringify(e) === JSON.stringify([item, item2])) > -1}/>
                    ) : (
                        renderFunctionValueSelect(props.name, props.value, [item, item2], domain, props.onInputChange)
                    )}
                </td>
            )}
        </tr>
    );

    return (
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>{props.name}</th>
                {domain.map(item =>
                    <th>{item}</th>
                )}
            </tr>
            </thead>
            <tbody>
            {props.arity == 1 ? arity1 : arity2}
            </tbody>
        </table>
    )
}

export default RelationalTable;