import React from 'react';
import {Table} from 'react-bootstrap';
import {PREDICATE} from "../../constants";

function renderFunctionValueSelect(functionName, functionValues, params, domain, onChange, disabled) {
  let value = functionValues[JSON.stringify(params)];
  if (!value) {
    value = '';
  }
  return (
     <select onChange={(e) => onChange(params.concat([e.target.value]), functionName)} value={value}>
       <option value=''>{''}</option>
       {domain.map(item =>
          <option disabled={disabled} value={item}>{item}</option>
       )}
     </select>
  )
}

function RelationalTable(props) {
  let domain = [...props.domain];
  let arity1 = (
     <tr>
       <td>{''}</td>
       {domain.map((item, index) =>
          <td>
            {props.type === PREDICATE ? (
               <input type='checkbox'
                      onChange={(e) => props.onInputChange([item], props.name, e.target.checked)}
                      checked={props.value.findIndex((e) => JSON.stringify(e) === JSON.stringify([item])) > -1}
                      disabled={props.disabled}/>
            ) : (
               renderFunctionValueSelect(props.name, props.value, [item], domain, props.onInputChange, props.disabled)
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
            {props.type === PREDICATE ? (
               <input type='checkbox'
                      onChange={(e) => props.onInputChange([item, item2], props.name, e.target.checked)}
                      checked={props.value.findIndex((e) => JSON.stringify(e) === JSON.stringify([item, item2])) > -1}
                      disabled={props.disabled}/>
            ) : (
               renderFunctionValueSelect(props.name, props.value, [item, item2], domain, props.onInputChange, props.disabled)
            )}
          </td>
       )}
     </tr>
  );

  return (
     <Table bordered responsive>
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
     </Table>
  )
}

export default RelationalTable;