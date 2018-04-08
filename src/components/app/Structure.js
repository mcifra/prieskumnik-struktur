import React from 'react';
import RelationalTable from "./RelationalTable";
import {
    Button,
    Col, Form, FormControl, FormGroup, HelpBlock, InputGroup, OverlayTrigger, Panel, Popover,
    Row
} from "react-bootstrap";

function Structure(props) {
    let constants = Object.keys(props.inputs.structure.constants);
    let predicates = Object.keys(props.inputs.structure.predicates);
    let functions = Object.keys(props.inputs.structure.functions);
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
                                        validationState={props.inputs.structure.domain.feedback.message !== '' ? 'error' : null}>
                                        <InputGroup>
                                            <label className='input-group-addon'
                                                   htmlFor='structure-editor-domain'><var>M</var> = &#123;</label>
                                            <FormControl value={props.inputs.structure.domain.value}
                                                         id='structure-editor-domain'
                                                         type='text'
                                                         onChange={(e) => props.onDomainChange(e.target.value)}
                                                         disabled={props.inputs.structure.domain.locked}/>
                                            <span className='input-group-addon'>&#125;</span>
                                            <span className="input-group-btn">
                                                <Button onClick={() => props.lockDomain()}>🔒</Button>
                                            </span>
                                        </InputGroup>
                                        <HelpBlock>{props.inputs.structure.domain.feedback.message}</HelpBlock>
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
                                                validationState={props.inputs.structure.constants[constant].feedback.message !== '' ? 'error' : null}>
                                                <InputGroup>
                                                    <label className='input-group-addon'
                                                           htmlFor={'constant-' + constant}><var>i</var> ({constant})</label>
                                                    <select value={props.inputs.structure.constants[constant].value}
                                                            id={'constant-' + constant}
                                                            className='form-control'
                                                            onChange={(e) => props.onConstantValueChange(e.target.value, constant)}
                                                            disabled={props.inputs.structure.constants[constant].locked}>
                                                        <option value={''}>Vyber hodnotu ...</option>
                                                        {[...props.structure.domain].map((item) =>
                                                            <option value={item}>{item}</option>
                                                        )}
                                                    </select>
                                                    <span className="input-group-btn">
                                                        <Button
                                                            onClick={() => props.lockConstantValue(constant)}>&#128274;</Button>
                                                    </span>
                                                </InputGroup>
                                                <HelpBlock>{props.inputs.structure.constants[constant].feedback.message}</HelpBlock>
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
                                                validationState={props.inputs.structure.predicates[name].feedback.message !== '' ? 'error' : null}>
                                                <InputGroup>
                                                    <label className='input-group-addon'
                                                           htmlFor={'predicate-' + name}><var>i</var> ({name.split('/')[0]})</label>
                                                    <FormControl id={'predicate-' + name}
                                                                 value={props.inputs.structure.predicates[name].value}
                                                                 type='text'
                                                                 onChange={(e) => props.onPredicateValueChangeText(e.target.value, name)}
                                                                 disabled={props.inputs.structure.predicates[name].locked}/>
                                                    <InputGroup.Button>
                                                        <Button
                                                            onClick={() => props.toggleTable('PREDICATE', name)}>T</Button>
                                                        <Button
                                                            onClick={() => props.lockPredicateValue(name)}>&#128274;</Button>
                                                    </InputGroup.Button>
                                                </InputGroup>
                                                {props.inputs.structure.predicates[name].editMode === 'TEXT' ? null : (
                                                    <RelationalTable name={name} domain={props.structure.domain}
                                                                     arity={props.structure.language.getPredicate(name.split('/')[0])}
                                                                     value={props.structure.iPredicate.get(name) ? props.structure.iPredicate.get(name) : []}
                                                                     onInputChange={props.onPredicateValueChangeTable}
                                                                     type='PREDICATE'
                                                                     disabled={props.inputs.structure.predicates[name].locked}/>
                                                )}
                                                <HelpBlock>{props.inputs.structure.predicates[name].feedback.message}</HelpBlock>
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
                                                validationState={props.inputs.structure.functions[name].feedback.message !== '' ? 'error' : null}>
                                                <InputGroup>
                                                    <label className='input-group-addon'
                                                           htmlFor={'function-' + name}><var>i</var> ({name.split('/')[0]})</label>
                                                    <FormControl id={'function-' + name}
                                                                 value={props.inputs.structure.functions[name].value}
                                                                 type='text'
                                                                 onChange={(e) => props.onFunctionValueChangeText(e.target.value, name)}
                                                                 disabled={props.inputs.structure.functions[name].locked}/>
                                                    <InputGroup.Button>
                                                        <Button
                                                            onClick={() => props.toggleTable('FUNCTION', name)}>T</Button>
                                                        <Button
                                                            onClick={() => props.lockFunctionValue(name)}>&#128274;</Button>
                                                    </InputGroup.Button>
                                                </InputGroup>
                                                {props.inputs.structure.functions[name].editMode === 'TEXT' ? null : (
                                                    <RelationalTable name={name} domain={props.structure.domain}
                                                                     arity={props.structure.language.getFunction(name.split('/')[0])}
                                                                     value={props.structure.iFunction.get(name) ? props.structure.iFunction.get(name) : new Map()}
                                                                     onInputChange={props.onFunctionValueChangeTable}
                                                                     disabled={props.inputs.structure.functions[name].locked}
                                                                     type='FUNCTION'/>
                                                )}
                                                <HelpBlock>{props.inputs.structure.functions[name].feedback.message}</HelpBlock>
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