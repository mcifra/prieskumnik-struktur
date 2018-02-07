import React from 'react';
import {Row, Col, InputGroup, FormControl, FormGroup, ControlLabel, Panel, HelpBlock} from 'react-bootstrap';

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
                    <FormGroup validationState={this.state.domain_error !== '' ? 'error' : null}>
                        <ControlLabel>Doména</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>{'𝓜'}</InputGroup.Addon>
                            <FormControl type="text"
                                         onChange={(items) => this.updateDomain(items)}
                                         onFocus={(items) => this.updateDomain(items)} key={"test"}/>
                        </InputGroup>
                        <HelpBlock>{this.state.domain_error}</HelpBlock>
                    </FormGroup>
                </Col>
            </Row>
        );
    }

    getConstantsValueInputElement() {
        let constants = [...this.props.structure.language.constants];
        let domain = [...this.props.structure.domain];
        if (constants.length === 0) {
            return null;
        }
        return (
            <Row>
                <Col lg={12}>
                    <FormGroup>
                        <ControlLabel>Konštanty</ControlLabel>
                        {constants.map((curr, i) =>
                            <InputGroup>
                                <InputGroup.Addon>{'𝘪 ('}{curr}{') = '}</InputGroup.Addon>
                                <FormControl componentClass='select' onChange={(e) => this.updateConstantValue(curr, e)}>
                                    {domain.map((current, index) =>
                                        <option key={index} value={current}>{current}</option>
                                    )}
                                </FormControl>
                            </InputGroup>
                        )}
                    </FormGroup>
                </Col>
            </Row>
        );
    }

    getPredicatesValueInputElement() {
        let predicates = [...this.props.structure.language.predicates];
        if (predicates.length === 0) {
            return null;
        }
        console.log('predicates:', predicates);
        return (
            <Row>
                <Col lg={12}>
                    {/**/}
                        <ControlLabel>Predikáty</ControlLabel>
                        {predicates.map((curr, i) =>
                            <FormGroup validationState={this.state.iPredicate_error.get(curr[0]) != null ? 'error' : null}>
                                <InputGroup >
                                    <InputGroup.Addon>{'𝘪 ('}{curr[0]}{")"}</InputGroup.Addon>
                                    <FormControl type='text' onChange={(e) => this.updatePredicateValue(curr[0], e)}/>
                                </InputGroup>
                                <HelpBlock>{this.state.iPredicate_error.get(curr[0])}</HelpBlock>
                            </FormGroup>
                        )}
                    {/*</FormGroup>*/}
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
                    <FormGroup>
                        <ControlLabel>Funkcie</ControlLabel>
                        {functions.map((curr, i) =>
                            <InputGroup>
                                <InputGroup.Addon>{'𝘪 ('}{curr[0]}{')'}</InputGroup.Addon>
                                <FormControl type='text' onChange={(e) => this.updateFunctionValue(curr[0], e)}/>
                            </InputGroup>
                        )}
                    </FormGroup>
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <div className="structure-editor">
                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass='h2'>Štruktúra</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {this.getDomainValueInputElement()}
                        {this.getConstantsValueInputElement()}
                        {this.getPredicatesValueInputElement()}
                        {this.getFunctionsValueInputElement()}
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
                let itemsParsed = this.parser.parse(items, {startRule: 'structure_domain_items_list', structure: this.props.structure});
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
        // console.log('functionName:', functionName);
        let value = e.target.value;
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
        }
    }
}

export default StructureEditor;