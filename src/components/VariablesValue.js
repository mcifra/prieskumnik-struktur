import React from 'react';
import {Col, FormGroup, HelpBlock, Panel, Row} from "react-bootstrap";
import TextInput from "./inputs/TextInput";

const help = (
   <div className="collapse" id="help-variables">
     <div className="well">
       Tu sa definujú hodnoty premenných. Za premennú sa považuje každý symbol, ktorý nie je v jazyku. Syntax
       zapisovania má formát <code>(premenná, hodnota)</code>.
     </div>
   </div>
);

const VariablesValue = (props) => (
   <Panel>
     <Panel.Heading>
       <Panel.Title componentClass='h2'>Ohodnotenie premenných</Panel.Title>
       <span data-toggle="collapse" data-target="#help-variables"
             aria-expanded="false"
             aria-controls="collapseExample">
                    ?
                 </span>
     </Panel.Heading>
     <Panel.Body>
       {help}
       <Row>
         <Col lg={12}>
           <fieldset>
             <legend>Ohodnotenie premenných</legend>
             <FormGroup
                validationState={props.variables.errorMessage.length > 0 ? 'error' : null}>
               <TextInput onChange={(e) => props.onInputChange(e.target.value)}
                          onLock={() => props.lockInput()}
                          textData={props.variables}
                          label={<span><var>e</var> = &#123;</span>}
                          teacherMode={props.teacherMode}
                          id='editor-variables'
                          placeholder='(x,1), (y,2), (z,3), ...'/>
               <HelpBlock>{props.variables.errorMessage}</HelpBlock>
             </FormGroup>
           </fieldset>
         </Col>
       </Row>
     </Panel.Body>
   </Panel>
);

export default VariablesValue;