import React from 'react';
import {Row, Col, InputGroup, FormControl, FormGroup, ControlLabel, Panel, HelpBlock, Popover, OverlayTrigger, Form} from 'react-bootstrap';

import InvalidLanguageException from "../../exceptions/InvalidLanguageException";

class StructureEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            domain_error: '',
            iConstant_error: new Map(),
            iPredicate_error: new Map(),
            iFunction_error: new Map()
        };
        this.parser = require('../../backend/parser/grammar');
    }

    getDomainValueInputElement() {
        return (
            <Row>
                <Col lg={12}>
                    <fieldset>
                        <legend>Doména</legend>
                        <FormGroup validationState={this.state.domain_error !== '' ? 'error' : null}>
                            <InputGroup>
                                <label className='input-group-addon' htmlFor='domain-value'><i>M</i></label>
                                <FormControl type="text"
                                             id='domain-value'
                                             onChange={(items) => this.updateDomain(items)}
                                             onFocus={(items) => this.updateDomain(items)} key={"test"}/>
                            </InputGroup>
                            <HelpBlock>{this.state.domain_error}</HelpBlock>
                        </FormGroup>
                    </fieldset>
                </Col>
            </Row>
        );
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
                                    <label className='input-group-addon' htmlFor={'constant-' + constant}>{'𝘪 ('}{constant}{')'}</label>
                                    <select value={s.getConstantValue(constant)} id={'constant-' + constant} className='form-control'
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
                            <FormGroup validationState={this.state.iPredicate_error.get(curr[0]) != null ? 'error' : null}>
                                <InputGroup>
                                    <label className='input-group-addon' htmlFor={'predicate-' + curr[0]}>{'𝘪 ('}{curr[0]}{")"}</label>
                                    <FormControl type='text' id={'predicate-' + curr[0]} onChange={(e) => this.updatePredicateValue(curr[0], e)}/>
                                </InputGroup>
                                <HelpBlock>{this.state.iPredicate_error.get(curr[0])}</HelpBlock>
                            </FormGroup>
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
                            <FormGroup validationState={this.state.iFunction_error.get(curr[0]) != null ? 'error' : null}>
                                <InputGroup>
                                    <label className='input-group-addon' htmlFor={'function-' + curr[0]}>{'𝘪 ('}{curr[0]}{')'}</label>
                                    <FormControl type='text' id={'function-' + curr[0]} onChange={(e) => this.updateFunctionValue(curr[0], e)}/>
                                </InputGroup>
                                <HelpBlock>{this.state.iFunction_error.get(curr[0])}</HelpBlock>
                            </FormGroup>
                        )}
                    </fieldset>
                </Col>
            </Row>
        );
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
                            {this.getConstantsValueInputElement()}
                            {this.getPredicatesValueInputElement()}
                            {this.getFunctionsValueInputElement()}
                        </Form>
                    </Panel.Body>
                </Panel>
            </div>
        )
    }

    updateDomain(items) {
        items = items.target.value;
        if (this.state.domain_error !== '') {
            this.setState({
                domain_error: ''
            })
        }
        try {
            let newDomain = new Set();
            if (items.length > 0) {
                let itemsParsed = this.parser.parse(items, {
                    startRule: 'structure_domain_items_list',
                    structure: this.props.structure
                });
                for (let i = 0; i < itemsParsed.length; i++) {
                    if (newDomain.has(itemsParsed[i]))
                        throw new InvalidLanguageException('Štruktúra už obsahuje prvok ' + itemsParsed[i]);
                    newDomain.add(itemsParsed[i]);
                }
            }
            this.props.structure.setDomain(newDomain);
            this.props.onChange(this.props.structure);
        } catch (e) {
            console.error(e);
            this.setState({
                domain_error: e.message
            })
        }
    }

    updateConstantValue(constantName, e) {
        try {
            this.props.structure.setConstantValue(constantName, e.target.value);
            this.props.onChange(this.props.structure);
        } catch (e) {
            console.error(e);
        }
    }

    updatePredicateValue(predicateName, e) {
        let value = e.target.value;
        let iPredicate_error = this.state.iPredicate_error;
        if (iPredicate_error.get(predicateName) != null) {
            iPredicate_error.delete(predicateName);
            this.setState({
                iPredicate_error: iPredicate_error
            });
        }
        try {
            let valueParsed = [];
            if (value.length > 0) {
                valueParsed = this.parser.parse(value, {
                    startRule: 'structure_tuples_list',
                    arity: this.props.structure.language.getPredicate(predicateName)
                });
            }
            for (let i = 0; i < valueParsed.length; i++) {
                for (let j = 0; j < valueParsed[i].length; j++) {
                    if (!this.props.structure.domain.has(valueParsed[i][j])) {
                        throw new InvalidLanguageException('Prvok ' + valueParsed[i][j] + ' nie je v doméne štruktúry');
                    }
                }
            }
            this.props.structure.setPredicateValue(predicateName, valueParsed);
            this.props.onChange(this.props.structure);
        } catch (e) {
            console.error(e);
            iPredicate_error.set(predicateName, e.message);
            this.setState({
                iPredicate_error: iPredicate_error
            })
        }
    }

    updateFunctionValue(functionName, e) {
        let value = e.target.value;
        let iFunction_error = this.state.iFunction_error;
        if (iFunction_error.get(functionName) != null) {
            iFunction_error.delete(functionName);
            this.setState({
                iFunction_error: iFunction_error
            });
        }
        let arity = parseInt(this.props.structure.language.getFunction(functionName));
        try {
            let valueParsed = [];
            if (value.length > 0) {
                valueParsed = this.parser.parse(value, {
                    startRule: 'structure_tuples_list',
                    arity: arity + 1
                });
            }
            console.log('valueParsed:', valueParsed);
            for (let i = 0; i < valueParsed.length; i++) {
                for (let j = 0; j < valueParsed[i].length; j++) {
                    if (!this.props.structure.domain.has(valueParsed[i][j])) {
                        throw new InvalidLanguageException('Prvok ' + valueParsed[i][j] + ' nie je v doméne štruktúry');
                    }
                }
            }
            if (this.props.structure.iFunction.has(functionName))
                this.props.structure.iFunction.set(functionName, new Map());
            for (let i = 0; i < valueParsed.length; i++) {
                this.props.structure.setFunctionValue(functionName, valueParsed[i].slice(0, arity), valueParsed[i][arity]);
            }
            this.props.onChange(this.props.structure);
        } catch (e) {
            console.error(e);
            iFunction_error.set(functionName, e.message);
            this.setState({
                iFunction_error: iFunction_error
            })
        }
    }
}

export default StructureEditor;