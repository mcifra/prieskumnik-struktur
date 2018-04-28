import React from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';
import LockButton from "../buttons/LockButton";
import TableButton from "../buttons/TableButton";

const TextInput = ({onChange, onLock, textData, label, teacherMode, id, toggleTable, arity, domain}) => (
    <InputGroup>
       <label className='input-group-addon'
              htmlFor={id}>{label}</label>
       <FormControl id={id}
                    type='text'
                    onChange={(e) => onChange(e)}
                    value={textData.value}
                    disabled={textData.locked}/>
       <InputGroup.Addon>&#125;</InputGroup.Addon>
       {toggleTable || teacherMode ? (
           <InputGroup.Button>
              {toggleTable ? (
                  (arity > 2 || domain.length === 0) ? null : (
                      <TableButton onClick={() => toggleTable()}/>
                  )
              ) : null}
              {teacherMode ? (
                  <LockButton lockFn={() => onLock()} locked={textData.locked}/>
              ) : null}
           </InputGroup.Button>
       ) : null}
    </InputGroup>
);

export default TextInput;