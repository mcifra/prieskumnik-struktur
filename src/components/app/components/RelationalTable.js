import React from 'react';

function RelationalTable(props) {
    let domain = [...props.domain];

    if (props.arity > 2)
        return <p>Nepodporovana arita</p>;

    let arity1 = (
        <tr>
            <td>{''}</td>
            {domain.map((item, index) =>
                <td><input type='checkbox' onChange={(e) => props.onInputChange(e.target.checked, props.name, [item])}
                           checked={props.value.findIndex((e) => JSON.stringify(e) === JSON.stringify([item])) > -1}/>
                </td>
            )}
        </tr>
    );

    let arity2 = domain.map((item, index) =>
        <tr>
            <td>{item}</td>
            {domain.map((item2, index2) =>
                <td><input type='checkbox'
                           onChange={(e) => props.onInputChange(e.target.checked, props.name, [item, item2])}
                           checked={props.value.findIndex((e) => JSON.stringify(e) === JSON.stringify([item, item2])) > -1}/>
                </td>
            )}
        </tr>
    );

    return (
        <table>
            <tr>
                <td>{props.name}</td>
                {domain.map((item, index) =>
                    <td>{item}</td>
                )}
            </tr>
            {props.arity == 1 ? arity1 : arity2}
        </table>
    )
}

export default RelationalTable;