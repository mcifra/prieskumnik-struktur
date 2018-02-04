import React from 'react';
import {Row, Col, FormGroup, ControlLabel, InputGroup, FormControl, HelpBlock} from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';

class LanguageEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            constants_error: '',
            predicates_error: '',
            functions_error: ''
        };
        this.lastConstantsValue = '';
    }

    render() {
        return (
            <div className='language-editor'>
                <Panel bsStyle='info'>
                    <Panel.Heading>
                        <Panel.Title componentClass='h2'>Jazyk</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <div className={'bs-example-form'}>
                            <Row>
                                <Col lg={12}>
                                    <FormGroup validationState={this.state.constants_error != '' ? 'error' : null}>
                                        <ControlLabel htmlFor='language-constants'>Konštanty</ControlLabel>
                                        <InputGroup>
                                            <InputGroup.Addon>{'𝓒'}<sub>{'𝓛'}</sub>{' = {'}</InputGroup.Addon>
                                            <FormControl id='language-constants' type='text' onChange={(e) => this.updateConstants(e)}
                                                         onFocus={(e) => this.updateConstants(e)}/>
                                            <InputGroup.Addon>{"}"}</InputGroup.Addon>
                                        </InputGroup>
                                        <HelpBlock>{this.state.constants_error}</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <FormGroup validationState={this.state.predicates_error != '' ? 'error' : null}>
                                        <ControlLabel htmlFor='language-predicates'>Predikáty</ControlLabel>
                                        <InputGroup>
                                            <InputGroup.Addon>{'𝓟'}<sub>{'𝓛'}</sub>{' = {'}</InputGroup.Addon>
                                            <FormControl id='language-predicates' type='text' onChange={(e) => this.updatePredicates(e)}
                                                onFocus={(e) => this.updatePredicates(e)}/>
                                            <InputGroup.Addon>{"}"}</InputGroup.Addon>
                                        </InputGroup>
                                        <HelpBlock>{this.state.predicates_error}</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <FormGroup validationState={this.state.functions_error != '' ? 'error' : null}>
                                        <ControlLabel htmlFor='language-functions'>Funkcie</ControlLabel>
                                        <InputGroup>
                                            <InputGroup.Addon>{'𝓕'}<sub>{'𝓛'}</sub>{' = {'}</InputGroup.Addon>
                                                <FormControl id='language-functions' type='text' onChange={(e) => this.updateFunctions(e)}
                                                onFocus={(e) => this.updateFunctions(e)}/>
                                                <InputGroup.Addon>{"}"}</InputGroup.Addon>
                                        </InputGroup>
                                        <HelpBlock>{this.state.functions_error}</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }

    updateConstants(e) {
        let parser = require('../../backend/parser/grammar');
        let inputValue = e.target.value;
        this.setState({
            constants_error: ''
        });
        try {
            let parsedValue = [];
            if (inputValue.length > 0)
                parsedValue = parser.parse(inputValue, {startRule: 'language_constants_list'});
            this.props.structure.setLanguageConstants(parsedValue);
            this.props.onChange(this.props.structure);
        } catch (e) {
            console.error(e);
            this.setState({
                constants_error: e.message
            });
        }

    }

    updatePredicates(e) {
        let parser = require('../../backend/parser/grammar');
        let inputValue = e.target.value;
        this.setState({
            predicates_error: ''
        });
        try {
            let parsedValue = [];
            if (inputValue.length > 0)
                parsedValue = parser.parse(inputValue, {startRule: 'language_predicates_list'});
            this.props.structure.setLanguagePredicates(parsedValue);
            this.props.onChange(this.props.structure);
        } catch (e) {
            console.error(e);
            this.setState({
                predicates_error: e.message
            });
        }
    }

    updateFunctions(e) {
        let parser = require('../../backend/parser/grammar');
        let inputValue = e.target.value;
        this.setState({
            functions_error: ''
        });
        try {
            let parsedValue = [];
            if (inputValue.length > 0)
                parsedValue = parser.parse(inputValue, {startRule: 'language_functions_list'});
            this.props.structure.setLanguageFunctions(parsedValue);
            this.props.onChange(this.props.structure);
        } catch (e) {
            console.error(e);
            this.setState({
                functions_error: e.message
            });
        }
    }
}

export default LanguageEditor;