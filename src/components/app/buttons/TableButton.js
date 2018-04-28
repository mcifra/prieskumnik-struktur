import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Button} from "react-bootstrap";

const TableButton = ({onClick}) => (
    <Button onClick={() => onClick()}>
       <FontAwesome name='table'/>
    </Button>
);

export default TableButton;