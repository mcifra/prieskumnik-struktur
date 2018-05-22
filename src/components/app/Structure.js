import React from 'react';
import RelationalTable from "./RelationalTable";
import {
  Col,
  Form,
  FormGroup,
  HelpBlock,
  InputGroup,
  Panel,
  Row
} from "react-bootstrap";
import {FUNCTION, PREDICATE} from "../../constants";
import LockButton from "./buttons/LockButton";
import TextInput from "./inputs/TextInput";

const help = (
   <div className="collapse" id="help-structure">
     <div className="well">
       Pomocou editoru štruktúry sa definuje štruktúra. Prvky <strong>domény</strong> sa oddeľujú čiarkami.
       Pridaním nového symbolu do jazyka sa automaticky pridá vstup na zadanie interpretácie.
       Interpretácia <strong>konštanty</strong> sa vyberá zo selectu, ktorý automaticky obsahuje prvky z
       domény. Interpretácia <strong>predikátového symbolu</strong> s&nbsp;aritou&nbsp;<var>n</var> sa zapisuje vo
       formáte <code>(prvok<sub>1</sub>, …, prvok<sub><var>n</var></sub>)</code>.
       Interpretácia <strong>funkčného symbolu</strong> s&nbsp;aritou&nbsp;<var>n</var> sa zapisuje vo
       formáte <code>(prvok<sub>1</sub>, …, prvok<sub><var>n</var></sub>, hodnota)</code>.
     </div>
   </div>
);

function Structure(props) {
  let constants = Object.keys(props.structure.constants);
  let predicates = Object.keys(props.structure.predicates);
  let functions = Object.keys(props.structure.functions);

  return (
     <Panel>
       <Panel.Heading>
         <Panel.Title componentClass='h2'>Štruktúra 𝓜 = (<var>M</var>, <var>i</var>)</Panel.Title>
         <span data-toggle="collapse" data-target="#help-structure"
               aria-expanded="false"
               aria-controls="collapseExample">
                    ?
                 </span>
       </Panel.Heading>
       <Panel.Body>
         {help}
         <Form>
           <Row>
             <Col lg={12}>
               <fieldset>
                 <legend>Doména</legend>
                 <FormGroup
                    validationState={props.structure.domain.errorMessage.length > 0 ? 'error' : null}>
                   <TextInput onChange={(e) => props.setDomain(e.target.value)}
                              onLock={() => props.lockDomain()}
                              textData={props.structure.domain}
                              label={<span><var>M</var> = &#123;</span>}
                              teacherMode={props.teacherMode}
                              id='language-editor-domain'/>
                   <HelpBlock>{props.structure.domain.errorMessage}</HelpBlock>
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
                          validationState={props.structure.constants[constant].errorMessage.length > 0 ? 'error' : null}>
                         <InputGroup>
                           <label className='input-group-addon'
                                  htmlFor={'constant-' + constant}><var>i</var>({constant}) = </label>
                           <select value={props.structure.constants[constant].value}
                                   id={'constant-' + constant}
                                   className='form-control bootstrap-select'
                                   onChange={(e) => props.setConstantValue(e.target.value, constant)}
                                   disabled={props.structure.constants[constant].locked}>
                             <option value={''}>Vyber hodnotu ...</option>
                             {[...props.structureObject.domain].map((item) =>
                                <option value={item}>{item}</option>
                             )}
                           </select>
                           {props.teacherMode ? (
                              <InputGroup.Button>
                                <LockButton lockFn={() => props.lockConstantValue(constant)}
                                            locked={props.structure.constants[constant].locked}/>
                              </InputGroup.Button>
                           ) : null}
                         </InputGroup>
                         <HelpBlock>{props.structure.constants[constant].errorMessage}</HelpBlock>
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
                          validationState={props.structure.predicates[name].errorMessage.length > 0 ? 'error' : null}>
                         <TextInput onChange={(e) => props.setPredicateValueText(e.target.value, name)}
                                    onLock={() => props.lockPredicateValue(name)}
                                    textData={props.structure.predicates[name]}
                                    label={<span><var>i</var>({name.split('/')[0]}) = &#123;</span>}
                                    teacherMode={props.teacherMode}
                                    id={'predicate-' + name}
                                    toggleTable={() => props.toggleTable(PREDICATE, name)}
                                    arity={parseInt(name.split('/')[1])}
                                    domain={props.domain}/>
                         {props.structure.predicates[name].tableEnabled && props.domain.length > 0 ? (
                            <RelationalTable name={name} domain={props.structureObject.domain}
                                             arity={props.structureObject.language.getPredicate(name.split('/')[0])}
                                             value={props.structureObject.iPredicate.get(name) ? props.structureObject.iPredicate.get(name) : []}
                                             onInputChange={props.setPredicateValueTable}
                                             type={PREDICATE}
                                             disabled={props.structure.predicates[name].locked}/>
                         ) : null}
                         <HelpBlock>{props.structure.predicates[name].errorMessage}</HelpBlock>
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
                          validationState={props.structure.functions[name].errorMessage.length > 0 ? 'error' : null}>
                         <TextInput onChange={(e) => props.setFunctionValueText(e.target.value, name)}
                                    onLock={() => props.lockFunctionValue(name)}
                                    textData={props.structure.functions[name]}
                                    label={<span><var>i</var>({name.split('/')[0]}) = &#123;</span>}
                                    teacherMode={props.teacherMode}
                                    id={'function-' + name}
                                    toggleTable={() => props.toggleTable(FUNCTION, name)}
                                    arity={parseInt(name.split('/')[1])}
                                    domain={props.domain}/>
                         {props.structure.functions[name].tableEnabled && props.domain.length > 0 ? (
                            <RelationalTable name={name} domain={props.structureObject.domain}
                                             arity={props.structureObject.language.getFunction(name.split('/')[0])}
                                             value={props.structureObject.iFunction.has(name) ? props.structureObject.iFunction.get(name) : {}}
                                             onInputChange={props.setFunctionValueTable}
                                             disabled={props.structure.functions[name].locked}
                                             type={FUNCTION}/>
                         ) : null}
                         <HelpBlock>{props.structure.functions[name].errorMessage}</HelpBlock>
                       </FormGroup>
                    )}
                  </fieldset>
                </Col>
              </Row>
           )}
         </Form>
       </Panel.Body>
     </Panel>
  )
}

export default Structure;