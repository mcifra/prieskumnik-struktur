import React from 'react';
import {Row, Col, InputGroup, FormGroup, Panel, Popover, OverlayTrigger, Form} from 'react-bootstrap';

import InvalidLanguageException from "../../exceptions/InvalidLanguageException";
import ParsedTextInput from "./ParsedTextInput";

class StructureEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            iConstant_error: new Map(),
        };
    }

    render() {
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
                        <Panel.Title componentClass='h2'>Štruktúra 𝓜 = (M, i)</Panel.Title>
                        <OverlayTrigger trigger='click' placement='bottom' overlay={popoverHelp}>
                            <span>?</span>
                        </OverlayTrigger>
                    </Panel.Heading>
                    <Panel.Body>
                        <Form>
                            {this.getDomainValueInputElement()}
                            {this.getVariablesValueInputElement()}
                            {this.getConstantsValueInputElement()}
                            {this.getPredicatesValueInputElement()}
                            {this.getFunctionsValueInputElement()}
                        </Form>
                    </Panel.Body>
                </Panel>
            </div>
        )
    }

    getDomainValueInputElement() {
        return (
            <Row>
                <Col lg={12}>
                    <fieldset>
                        <legend>Doména</legend>
                        <ParsedTextInput label={<i>M</i>}
                                         id='domain-value'
                                         onChange={(parsedValue) => this.updateDomain(parsedValue)}
                                         parserOptions={this.getDomainParserOptions()}/>
                    </fieldset>
                </Col>
            </Row>
        );
    }

    getVariablesValueInputElement() {
        return (
            <Row>
                <Col lg={12}>
                    <fieldset>
                        <legend>Interpretácia indivíduových premenných ℯ</legend>
                        <ParsedTextInput label='ℯ'
                                         id='variables-value'
                                         onChange={(parsedValue) => this.updateVariableValue(parsedValue)}
                                         parserOptions={this.getDomainParserOptions()}/>
                    </fieldset>
                </Col>
            </Row>
        )
    }

    getConstantsValueInputElement() {
        let constants = [...this.props.structure.language.constants];
        let domain = [...this.props.structure.domain];
        let s = this.props.structure;
        if (constants.length === 0) {
            return null;
        }
        return (
            <Row>
                <Col lg={12}>
                    <fieldset>
                        <legend>Interpretácia symbolov konštánt</legend>
                        <FormGroup>
                            {constants.map((constant, i) =>
                                <InputGroup>
                                    <label className='input-group-addon'
                                           htmlFor={'constant-' + constant}>{'𝘪 ('}{constant}{')'}</label>
                                    <select value={s.getConstantValue(constant)} id={'constant-' + constant}
                                            className='form-control'
                                            onChange={(e) => this.updateConstantValue(constant, e)}>
                                        <option value=''/>
                                        {domain.map((item, index) =>
                                            <option value={item}>{item}</option>
                                        )}
                                    </select>
                                </InputGroup>
                            )}
                        </FormGroup>
                    </fieldset>
                </Col>
            </Row>
        );
    }

    getPredicatesValueInputElement() {
        let predicates = [...this.props.structure.language.predicates];
        if (predicates.length === 0) {
            return null;
        }
        return (
            <Row>
                <Col lg={12}>
                    <fieldset>
                        <legend>Interpretácia predikátových symbolov</legend>
                        {predicates.map((curr, i) =>
                            <ParsedTextInput label={'i (' + curr[0] + ')'}
                                             id={'predicate-' + curr[0]}
                                             onChange={(parsedValue) => this.updatePredicateValue(curr[0], parsedValue)}
                                             parserOptions={this.getPredicateParserOptions(curr[0])}/>
                        )}
                    </fieldset>
                </Col>
            </Row>
        );
    }

    getFunctionsValueInputElement() {
        let functions = [...this.props.structure.language.functions];
        if (functions.length === 0) {
            return null;
        }
        return (
            <Row>
                <Col lg={12}>
                    <fieldset>
                        <legend>Interpretácia funkčných symbolov</legend>
                        {functions.map((curr, i) =>
                            <ParsedTextInput label={'i (' + curr[0] + ')'}
                                             id={'function-' + curr[0]}
                                             onChange={(parsedValue) => this.updateFunctionValue(curr[0], parsedValue)}
                                             parserOptions={this.getFunctionParserOptions(curr[0])}/>
                        )}
                    </fieldset>
                </Col>
            </Row>
        );
    }

    getDomainParserOptions() {
        return {
            structure: this.props.structure,
            startRule: 'structure_domain_items_list'
        }
    }

    getPredicateParserOptions(predicateName) {
        return {
            structure: this.props.structure,
            startRule: 'structure_tuples_list',
            arity: this.props.structure.language.getPredicate(predicateName)
        }
    }

    getFunctionParserOptions(functionName) {
        return {
            structure: this.props.structure,
            startRule: 'structure_tuples_list',
            arity: parseInt(this.props.structure.language.getFunction(functionName)) + 1
        }
    }

    updateDomain(parsedValue) {
        let newDomain = new Set();
        for (let i = 0; i < parsedValue.length; i++) {
            if (newDomain.has(parsedValue[i]))
                throw new InvalidLanguageException('Štruktúra už obsahuje prvok ' + parsedValue[i]);
            newDomain.add(parsedValue[i]);
        }
        this.props.structure.setDomain(newDomain);
        this.props.onChange(this.props.structure);
    }

    updateVariableValue(items) {

    }

    updateConstantValue(constantName, e) {
        try {
            this.props.structure.setConstantValue(constantName, e.target.value);
            this.props.onChange(this.props.structure);
        } catch (e) {
            console.error(e);
        }
    }

    updatePredicateValue(predicateName, parsedValue) {
        this.props.structure.setPredicateValue(predicateName, parsedValue);
        this.props.onChange(this.props.structure);
    }

    updateFunctionValue(functionName, parsedValue) {
        let m = this.props.structure.iFunction;
        if (m.has(functionName)) {
            m.get(functionName).clear();
        }
        // TODO Kontrola ci su vsetky moznosti vypisane
        // Predpoklada sa, ze vsetky prvky su v domene, ntice maju pozadovanu dlzku a neopakuju sa
        let arity = this.props.structure.language.getFunction(functionName);
        for (let i = 0; i < parsedValue.length; i++) {
            this.props.structure.setFunctionValue(functionName, parsedValue[i].slice(0, arity), parsedValue[i][arity]);
        }
        this.props.onChange(this.props.structure);
    }
}

export default StructureEditor;