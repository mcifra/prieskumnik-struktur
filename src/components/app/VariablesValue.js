import React from 'react';
import {Col, FormControl, FormGroup, HelpBlock, InputGroup, OverlayTrigger, Panel, Popover, Row} from "react-bootstrap";
import {STUDENT_MODE} from "../../constants";
import FontAwesome from 'react-fontawesome';

function VariablesValue(props) {
   const popoverHelp = (
       <div className="collapse" id="help-variables">
          <div className="well">
             Tu sa definujú hodnoty premenných. Za premennú sa považuje každý symbol, ktorý nie je v jazyku. Syntax
             zapisovania má formát <code>(premenná, hodnota)</code>.
          </div>
       </div>
   );
   return (
       <div className='language-editor'>
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
                {popoverHelp}
                <Row>
                   <Col lg={12}>
                      <fieldset>
                         <legend>Ohodnotenie premenných</legend>
                         <FormGroup
                             validationState={props.feedback !== '' ? 'error' : null}>
                            <InputGroup>
                               <label className='input-group-addon'
                                      htmlFor='structure-editor-variables'><var>e</var> = &#123;</label>
                               <FormControl value={props.value}
                                            id='structure-editor-variables'
                                            type='text'
                                            onChange={(e) => props.onInputChange(e.target.value)}
                                            disabled={props.locked}/>
                               <span className='input-group-addon'>&#125;</span>
                               {props.teacherMode ? (
                                   <span className="input-group-btn">
                                                <div className='btn btn-lock' onClick={() => props.lockInput()}>
                                                    <FontAwesome name={props.locked ? 'unlock' : 'lock'}/>
                                                </div>
                                            </span>
                               ) : null}
                            </InputGroup>
                            <HelpBlock>{props.feedback}</HelpBlock>
                         </FormGroup>
                      </fieldset>
                   </Col>
                </Row>
             </Panel.Body>
          </Panel>
       </div>
   )
}

export default VariablesValue;