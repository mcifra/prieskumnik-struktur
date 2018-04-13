import React from 'react';
import {
   Button,
   Col,
   FormControl,
   FormGroup,
   HelpBlock,
   InputGroup,
   OverlayTrigger,
   Panel,
   Popover,
   Row
} from "react-bootstrap";
import {EXPRESSION_LABEL, FORMULA, STUDENT_MODE, TERM} from "../../constants";
import FontAwesome from 'react-fontawesome';

const popoverHelpFormula = (
    <Popover id='popover-trigger-click' title='Vyhodnocovanie formúl'>
       Tu sa pridávajú formuly a kontroluje sa či spĺňajú vyššie definovanú štruktúru. Všetky termy a predikáty
       musia byť definované v jazyku.
    </Popover>
);

const popoverHelpTerm = (
    <Popover id='popover-trigger-click' title='Vyhodnocovanie termov'>
       Tu sa pridávajú termy a kontroluje sa ich hodnota. Všetky termy
       musia byť definované v jazyku.
    </Popover>
);

const getFormulaAnswers = (index) => (
    <React.Fragment>
       <option value={'-1'}>⊨/⊭?</option>
       <option value={'true'}>𝓜 ⊨ 𝝋<sub>{index + 1}</sub>[e]</option>
       <option value={'false'}>𝓜 ⊭ 𝝋[e]</option>
    </React.Fragment>
);

const getTermAnswers = (domain) => (
    <React.Fragment>
       <option value={''}>Vyber hodnotu ...</option>
       {domain.map(item =>
           <option value={item}>{item}</option>
       )}
    </React.Fragment>
);

function prepareExpressions(formulas, terms) {
   let f = {
      items: formulas,
      expressionType: FORMULA,
      answers: (index, domain) => getFormulaAnswers(index),
      help: popoverHelpFormula,
      panelTitle: 'Splnenie formúl v štruktúre 𝓜'
   };
   let t = {
      items: terms,
      expressionType: TERM,
      answers: (index, domain) => getTermAnswers(domain),
      help: popoverHelpTerm,
      panelTitle: 'Hodnoty termov v 𝓜'
   };
   return [f, t];
}

const Expressions = (props) => (
    <React.Fragment>
       {prepareExpressions(props.formulas, props.terms).map(expression =>
           <Panel>
              <Panel.Heading>
                 <Panel.Title>{expression.panelTitle}</Panel.Title>
                 <OverlayTrigger trigger='click' placement='bottom' overlay={expression.help}>
                    <span>?</span>
                 </OverlayTrigger>
              </Panel.Heading>
              <Panel.Body>
                 {expression.items.map((item, index) =>
                     <Row key={index}>
                        <Col sm={7}>
                           <FormGroup
                               validationState={item.value ? (item.validSyntax ? 'success' : 'error') : null}>
                              <InputGroup>
                                 <label className='input-group-addon'
                                        htmlFor={expression.expressionType.toLowerCase() + '-' + index}>
                                    <span>{EXPRESSION_LABEL[expression.expressionType]}<sub>{index + 1}</sub></span></label>
                                 <FormControl type='text' value={item.value}
                                              onChange={(e) => props.onInputChange(e.target.value, index, expression.expressionType)}
                                              id={expression.expressionType.toLowerCase() + '-' + index}
                                              disabled={item.inputLocked}/>
                                 <InputGroup.Button>
                                    <Button
                                        onClick={() => props.removeExpression(expression.expressionType, index)}><FontAwesome
                                        name='trash'/></Button>
                                    {props.mode === STUDENT_MODE ? null : (
                                        <div className='btn btn-lock'
                                             onClick={() => props.lockExpressionValue(expression.expressionType, index)}>
                                           <FontAwesome name={item.inputLocked ? 'unlock' : 'lock'}/>
                                        </div>
                                    )}
                                 </InputGroup.Button>
                              </InputGroup>
                              <HelpBlock>{item.feedback.message}</HelpBlock>
                           </FormGroup>
                        </Col>
                        <Col sm={3}>
                           <FormGroup>
                              <InputGroup>
                                 <label className='input-group-addon'
                                        htmlFor={expression.expressionType.toLowerCase() + '-answer-' + index}>𝓜</label>
                                 <select className='form-control' value={item.answerValue}
                                         onChange={(e) => props.setExpressionAnswer(expression.expressionType, e.target.value, index)}
                                         id={expression.expressionType.toLowerCase() + '-answer-' + index}
                                         disabled={item.answerLocked}>
                                    {expression.answers(index, props.domain)}
                                 </select>
                                 {props.mode === STUDENT_MODE ? null : (
                                     <InputGroup.Button>
                                        <div className='btn btn-lock'
                                             onClick={() => props.lockExpressionAnswer(expression.expressionType, index)}>
                                           <FontAwesome
                                               name={item.answerLocked ? 'unlock' : 'lock'}/>
                                        </div>
                                     </InputGroup.Button>
                                 )}
                              </InputGroup>
                           </FormGroup>
                        </Col>
                        <Col sm={2}>
                           {item.answerValue !== '' ? (item.answerValue === item.expressionValue ?
                               <strong className="text-success"><FontAwesome
                                   name='check'/>&nbsp;Správne</strong> :
                               <strong className="text-danger"><FontAwesome
                                   name='times'/>&nbsp;Nesprávne</strong>) : null}
                        </Col>
                     </Row>
                 )}
                 <Button bsStyle='success' onClick={() => props.addExpression(expression.expressionType)}><FontAwesome
                     name='plus'/> Pridaj</Button>
              </Panel.Body>
           </Panel>
       )}
    </React.Fragment>
);

export default Expressions;