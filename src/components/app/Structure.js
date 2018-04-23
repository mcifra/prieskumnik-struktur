import React from 'react';
import RelationalTable from "./RelationalTable";
import {
   Button,
   Col,
   Form,
   FormControl,
   FormGroup,
   HelpBlock,
   InputGroup,
   OverlayTrigger,
   Panel,
   Popover,
   Row
} from "react-bootstrap";
import {FUNCTION, PREDICATE, STUDENT_MODE} from "../../constants";
import FontAwesome from 'react-fontawesome';

function Structure(props) {
   let constants = Object.keys(props.structure.constants);
   let predicates = Object.keys(props.structure.predicates);
   let functions = Object.keys(props.structure.functions);
   const popoverHelp = (
       <Popover id='popover-trigger-click' title='Editor štruktúry'>
          Pomocou editoru štruktúry sa definuje štruktúra. Prvky <strong>domény</strong> sa oddeľujú čiarkami.
          Pridaním nového symbolu do jazyka sa automaticky pridá vstup na zadanie interpretácie.
          Interpretácia <strong>konštanty</strong> sa vyberá zo selectu, ktorý automaticky obsahuje prvky z
          domény. Interpretácia <strong>predikátového symbolu</strong> s&nbsp;aritou&nbsp;<var>n</var> sa zapisuje vo
          formáte <code>(prvok<sub>1</sub>, …, prvok<sub><var>n</var></sub>)</code>.
          Interpretácia <strong>funkčného symbolu</strong> s&nbsp;aritou&nbsp;<var>n</var> sa zapisuje vo
          formáte <code>(prvok<sub>1</sub>, …, prvok<sub><var>n</var></sub>, hodnota)</code>.
       </Popover>
   );
   return (
       <div className="structure-editor">
          <Panel>
             <Panel.Heading>
                <Panel.Title componentClass='h2'>Štruktúra 𝓜 = (<var>M</var>, <var>i</var>)</Panel.Title>
                <OverlayTrigger trigger='click' placement='bottom' overlay={popoverHelp}>
                   <span>?</span>
                </OverlayTrigger>
             </Panel.Heading>
             <Panel.Body>
                <Form>
                   <Row>
                      <Col lg={12}>
                         <fieldset>
                            <legend>Doména</legend>
                            <FormGroup
                                validationState={props.structure.domain.feedback.message !== '' ? 'error' : null}>
                               <InputGroup>
                                  <label className='input-group-addon'
                                         htmlFor='structure-editor-domain'><var>M</var> = &#123;</label>
                                  <FormControl value={props.structure.domain.value}
                                               id='structure-editor-domain'
                                               type='text'
                                               onChange={(e) => props.onDomainChange(e.target.value)}
                                               disabled={props.structure.domain.locked}/>
                                  <span className='input-group-addon'>&#125;</span>
                                  {props.teacherMode ? (
                                      <span className="input-group-btn">
                                                    <div className='btn btn-lock' onClick={() => props.lockDomain()}>
                                                        <FontAwesome
                                                            name={props.structure.domain.locked ? 'unlock' : 'lock'}/>
                                                    </div>
                                                </span>
                                  ) : null}
                               </InputGroup>
                               <HelpBlock>{props.structure.domain.feedback.message}</HelpBlock>
                            </FormGroup>
                         </fieldset>
                      </Col>
                   </Row>
                   {constants.length === 0 ? null : (
                       <Row>
                          <Col lg={12}>
                             <fieldset>
                                <legend>Interpretácia symbolov konštánt</legend>
                                {constants.map((constant) =>
                                    <FormGroup
                                        validationState={props.structure.constants[constant].feedback.message !== '' ? 'error' : null}>
                                       <InputGroup>
                                          <label className='input-group-addon'
                                                 htmlFor={'constant-' + constant}><var>i</var>({constant}) = </label>
                                          <select value={props.structure.constants[constant].value}
                                                  id={'constant-' + constant}
                                                  className='form-control'
                                                  onChange={(e) => props.onConstantValueChange(e.target.value, constant)}
                                                  disabled={props.structure.constants[constant].locked}>
                                             <option value={''}>Vyber hodnotu ...</option>
                                             {[...props.structureObject.domain].map((item) =>
                                                 <option value={item}>{item}</option>
                                             )}
                                          </select>
                                          {props.teacherMode ? (
                                              <span className="input-group-btn">
                                                            <div className='btn btn-lock'
                                                                 onClick={() => props.lockConstantValue(constant)}>
                                                                <FontAwesome
                                                                    name={props.structure.constants[constant].locked ? 'unlock' : 'lock'}/>
                                                            </div>
                                                        </span>
                                          ) : null}
                                       </InputGroup>
                                       <HelpBlock>{props.structure.constants[constant].feedback.message}</HelpBlock>
                                    </FormGroup>
                                )}
                             </fieldset>
                          </Col>
                       </Row>
                   )}
                   {predicates.length === 0 ? null : (
                       <Row>
                          <Col lg={12}>
                             <fieldset>
                                <legend>Interpretácia predikátových symbolov</legend>
                                {predicates.map((name) =>
                                    <FormGroup
                                        validationState={props.structure.predicates[name].feedback.message !== '' ? 'error' : null}>
                                       <InputGroup>
                                          <label className='input-group-addon'
                                                 htmlFor={'predicate-' + name}><var>i</var>({name.split('/')[0]})
                                             = &#123;</label>
                                          <FormControl id={'predicate-' + name}
                                                       value={props.structure.predicates[name].value}
                                                       type='text'
                                                       onChange={(e) => props.onPredicateValueChangeText(e.target.value, name)}
                                                       disabled={props.structure.predicates[name].locked}/>
                                          <span className='input-group-addon'>&#125;</span>
                                          <InputGroup.Button>
                                             {(parseInt(name.split('/')[1]) > 2 || props.domain.length === 0) ? null : (
                                                 <Button
                                                     onClick={() => props.toggleTable(PREDICATE, name)}>
                                                    <FontAwesome name='table'/>
                                                 </Button>
                                             )}
                                             {props.teacherMode ? (
                                                 <div className='btn btn-lock'
                                                      onClick={() => props.lockPredicateValue(name)}>
                                                    <FontAwesome
                                                        name={props.structure.predicates[name].locked ? 'unlock' : 'lock'}/>
                                                 </div>
                                             ) : null}
                                          </InputGroup.Button>
                                       </InputGroup>
                                       {props.structure.predicates[name].tableEnabled && props.domain.length > 0 ? (
                                           <RelationalTable name={name} domain={props.structureObject.domain}
                                                            arity={props.structureObject.language.getPredicate(name.split('/')[0])}
                                                            value={props.structureObject.iPredicate.get(name) ? props.structureObject.iPredicate.get(name) : []}
                                                            onInputChange={props.onPredicateValueChangeTable}
                                                            type={PREDICATE}
                                                            disabled={props.structure.predicates[name].locked}/>
                                       ) : null}
                                       <HelpBlock>{props.structure.predicates[name].feedback.message}</HelpBlock>
                                    </FormGroup>
                                )}
                             </fieldset>
                          </Col>
                       </Row>
                   )}
                   {functions.length === 0 ? null : (
                       <Row>
                          <Col lg={12}>
                             <fieldset>
                                <legend>Interpretácia funkčných symbolov</legend>
                                {functions.map((name) =>
                                    <FormGroup
                                        validationState={props.structure.functions[name].feedback.message !== '' ? 'error' : null}>
                                       <InputGroup>
                                          <label className='input-group-addon'
                                                 htmlFor={'function-' + name}><var>i</var>({name.split('/')[0]})
                                             = &#123;</label>
                                          <FormControl id={'function-' + name}
                                                       value={props.structure.functions[name].value}
                                                       type='text'
                                                       onChange={(e) => props.onFunctionValueChangeText(e.target.value, name)}
                                                       disabled={props.structure.functions[name].locked}/>
                                          <span className='input-group-addon'>&#125;</span>
                                          <InputGroup.Button>
                                             {(parseInt(name.split('/')[1]) > 2 || props.domain.length === 0) ? null : (
                                                 <Button onClick={() => props.toggleTable(FUNCTION, name)}>
                                                    <FontAwesome name='table'/>
                                                 </Button>
                                             )}
                                             {props.teacherMode ? (
                                                 <div className='btn btn-lock'
                                                      onClick={() => props.lockFunctionValue(name)}>
                                                    <FontAwesome
                                                        name={props.structure.functions[name].locked ? 'unlock' : 'lock'}/>
                                                 </div>
                                             ) : null}
                                          </InputGroup.Button>
                                       </InputGroup>
                                       {props.structure.functions[name].tableEnabled && props.domain.length > 0 ? (
                                           <RelationalTable name={name} domain={props.structureObject.domain}
                                                            arity={props.structureObject.language.getFunction(name.split('/')[0])}
                                                            value={props.structureObject.iFunction.get(name) ? props.structureObject.iFunction.get(name) : new Map()}
                                                            onInputChange={props.onFunctionValueChangeTable}
                                                            disabled={props.structure.functions[name].locked}
                                                            type={FUNCTION}/>
                                       ) : null }
                                       <HelpBlock>{props.structure.functions[name].feedback.message}</HelpBlock>
                                    </FormGroup>
                                )}
                             </fieldset>
                          </Col>
                       </Row>
                   )}
                </Form>
             </Panel.Body>
          </Panel>
       </div>
   )
}

export default Structure;