import React from 'react';
import FontAwesome from 'react-fontawesome';

const LockButton = ({lockFn, locked}) => (
   <button className='btn btn-lock' onClick={() => lockFn()}>
     <FontAwesome name={locked ? 'unlock' : 'lock'}/>
   </button>
);

export default LockButton;