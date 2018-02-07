import React from 'react';
import {Row, Col, InputGroup, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';

class StructureEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            domain_error: '',
        };
    }

    render() {
        let constants = [...this.props.structure.language.constants];
        let predicates = [...this.props.structure.language.predicates];
        let functions = [...this.props.structure.language.functions];
        let domain = [...this.props.structure.domain];
        return (
            <div className="structure-editor">
                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass='h2'>Štruktúra</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Row>
                            <Col lg={12}>
                                <FormGroup>
                                    <ControlLabel>Doména</ControlLabel>
                                    <InputGroup>
                                        <InputGroup.Addon>{'𝓜 = {'}</InputGroup.Addon>
                                        <FormControl type="text"
                                            onChange={(items) => this.updateDomain(items)}
                                            onFocus={(items) => this.updateDomain(items)} key={"test"}/>
                                        <InputGroup.Addon>{"}"}</InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        {constants.length > 0 ? (
                            <Row>
                                <Col lg={12}>
                                    <FormGroup>
                                        <ControlLabel>Konštanty</ControlLabel>
                                        {
                                            constants.map((curr, i) =>
                                                <InputGroup>
                                                    <InputGroup.Addon>{'𝘪 ('}{curr}{') = '}</InputGroup.Addon>
                                                    <FormControl componentClass='select' onChange={(e) => this.updateConstantValue(curr, e)}>
                                                        <option value='' selected></option>
                                                        {
                                                            domain.map((current, index) =>
                                                                <option key={index} value={current}>{current}</option>
                                                            )
                                                        }
                                                    </FormControl>
                                                </InputGroup>
                                            )
                                        }
                                    </FormGroup>
                                </Col>
                            </Row>
                        ) : ''}
                        {predicates.length > 0 ? (
                            <Row>
                                <Col lg={12}>
                                    <FormGroup>
                                        <ControlLabel>Predikáty</ControlLabel>
                                        {
                                            predicates.map((curr, i) =>
                                                <InputGroup>
                                                    <InputGroup.Addon>{'𝘪 ('}{curr[0]}{') = {'}</InputGroup.Addon>
                                                        <FormControl type='text' onChange={(e) => this.updatePredicateValue(curr[i][0], e)}/>
                                                        <InputGroup.Addon>{'}'}</InputGroup.Addon>
                                                </InputGroup>
                                            )
                                        }
                                    </FormGroup>
                                </Col>
                            </Row>
                        ) : ''}
                        {functions.length > 0 ? (
                            <Row>
                                <Col lg={12}>
                                    <FormGroup>
                                        <ControlLabel>Funkcie</ControlLabel>
                                        {
                                            functions.map((curr, i) =>
                                                <InputGroup>
                                                    <InputGroup.Addon>{'𝘪 ('}{curr[0]}{') = {'}</InputGroup.Addon>
                                                        <FormControl type='text' onChange={(e) => this.updateFunctionValue(curr[i][0], e)}/>
                                                        <InputGroup.Addon>{'}'}</InputGroup.Addon>
                                                </InputGroup>
                                            )
                                        }
                                    </FormGroup>
                                </Col>
                            </Row>
                        ) : ''}
                    </Panel.Body>
                </Panel>
            </div>
        )
    }

    updateDomain(items) {
        items = items.target.value;
        let parser = require('../../backend/parser/grammar');
        let s = this.props.structure;
        try {
            s.clearDomain();
            if (items.length > 0) {
                let itemsParsed = parser.parse(items, {startRule: 'structure_domain_items_list', structure: s});
                s.setDomain(itemsParsed);
            }
            this.props.onChange(s);
        } catch (e) {
            console.error(e);
        }
    }

    updateConstantValue(constantName, value) {
        value = value.target.value;
        let structure = this.props.structure;
        structure.setConstantValue(constantName, value);
        this.props.onChange(structure);
    }

    updatePredicateValue(predicateName, value) {
        value = value.target.value;
        let parser = require('../../backend/parser/grammar');
        let structure = this.props.structure;
        try {
            let valueParsed = parser.parse(value, {
                startRule: 'structure_tuples_list',
                arity: structure.language.getPredicate(predicateName)
            });
            for (let i = 0; i < valueParsed.length; i++) {
                for (let j = 0; j < valueParsed[i].length; j++) {
                    if (!structure.domain.has(valueParsed[i][j])) {
                        throw 'Domena neobsahuje prvok ' + valueParsed[i][j];
                    }
                }
            }
            structure.setPredicateValue(predicateName, valueParsed);
            this.props.onChange(structure);
        } catch (e) {
            console.error(e);
        }
    }

    updateFunctionValue(functionName, value) {
        value = value.target.value;
        let parser = require('../../backend/parser/grammar');
        let structure = this.props.structure;
        let arity = parseInt(structure.language.getFunction(functionName));
        try {
            let valueParsed = parser.parse(value, {
                startRule: 'structure_tuples_list',
                arity: arity + 1
            });
            structure.iFunction.clear();
            for (let i = 0; i < valueParsed.length; i++) {
                structure.setFunctionValue(functionName, valueParsed[i].slice(0, arity), valueParsed[i][arity]);
            }
            this.props.onChange(structure);
        } catch (e) {
            console.error(e);
        }
    }
}

export default StructureEditor;