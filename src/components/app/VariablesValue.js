import React from 'react';
import {
    Button, Col, FormControl, FormGroup, HelpBlock, InputGroup, OverlayTrigger, Panel, Popover,
    Row
} from "react-bootstrap";
import {STUDENT_MODE} from "../../constants";
import FontAwesome from 'react-fontawesome';

function VariablesValue(props) {
    const popoverHelp = (
        <Popover id='popover-trigger-click' title='Editor štruktúry'>
            Pomocou editoru štruktúry sa definuje štruktúra. Prvky <strong>domény</strong> sa oddeľujú čiarkami.
            Pridaním nového elementu do jazyka sa automaticky pridá vstup na zadanie interpretácie.
            Interpretácia <strong>konštanty</strong> sa vyberá zo selectu, ktorý automaticky obsahuje prvky z
            domény. Interpretácia <strong>predikátu</strong> sa zapisuje vo formáte <code>(prvok1, ..,
            prvokARITA)</code> oddelené čiarkami, kde prvky musia patriť do domény.
            Interpretácia <strong>funkcie</strong> sa zapisuje vo formáte <code>(prvok1, .., prvokARITA,
            prvokHODNOTA)</code> oddelené čiarkami, kde prvky musia patriť do domény.
        </Popover>
    );
    return (
        <div className='language-editor'>
            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass='h2'>Interpretácia premenných</Panel.Title>
                    <OverlayTrigger trigger='click' placement='bottom' overlay={popoverHelp}>
                        <span>?</span>
                    </OverlayTrigger>
                </Panel.Heading>
                <Panel.Body>
                    <Row>
                        <Col lg={12}>
                            <fieldset>
                                <legend>Interpretácia premenných</legend>
                                <FormGroup
                                    validationState={props.feedback !== '' ? 'error' : null}>
                                    <InputGroup>
                                        <label className='input-group-addon'
                                               htmlFor='structure-editor-variables'>{<var>e</var>}</label>
                                        <FormControl value={props.value}
                                                     id='structure-editor-variables'
                                                     type='text'
                                                     onChange={(e) => props.onInputChange(e.target.value)}
                                                     disabled={props.locked}/>
                                        {props.mode === STUDENT_MODE ? null : (
                                            <span className="input-group-btn">
                                                <div className='btn btn-lock' onClick={() => props.lockInput()}>
                                                    <FontAwesome name={props.locked ? 'unlock' : 'lock'}/>
                                                </div>
                                            </span>
                                        )}
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