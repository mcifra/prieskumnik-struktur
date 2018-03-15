import React from 'react';
import RelationalTable from "./RelationalTable";

function PredicatesValueEditor(props) {
    let predicates = Object.keys(props.predicates);
    return (
        <div>
            {predicates.map((name, index) =>
                <div>

                    {props.predicates[name].editMode === 'TABLE' ? (
                        <RelationalTable name={name} domain={props.structure.domain}
                                         arity={props.structure.language.getPredicate(name)}
                                         value={props.structure.iPredicate.get(name) ? props.structure.iPredicate.get(name) : []}
                                         onInputChange={props.onInputChange}/>
                    ) : (
                        <div>
                            <label>{name}</label>
                            <input value={props.predicates[name].value} type='text'
                                   onChange={(e) => props.onInputChange(e.target.value, name)}/>
                            <span>{props.predicates[name].error}</span>
                        </div>
                    )}

                    <label>Tabulka</label>
                    <input type='radio' name={'editMode-' + name} value='TABLE'
                           checked={props.predicates[name].editMode === 'TABLE'}
                           onChange={(e) => props.onChangeEditMode('TABLE', 'PREDICATE', name)}/>

                    <label>Text</label>
                    <input type='radio' name={'editMode-' + name} value='TEXT'
                           checked={props.predicates[name].editMode === 'TEXT'}
                           onChange={(e) => props.onChangeEditMode('TEXT', 'PREDICATE', name)}/>


                </div>
            )}
        </div>
    )
}

export default PredicatesValueEditor;