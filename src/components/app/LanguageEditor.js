import React from 'react';
import {Row, Col, FormGroup, ControlLabel, InputGroup, FormControl, HelpBlock, Popover, OverlayTrigger} from 'react-bootstrap';
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
        const popoverHelp = (
            <Popover id='popover-trigger-click' title='Editor jazyka'>
                Pomocou editoru jazyka sa definuje jazyk. <strong>Konštanty</strong> sa píšu oddelene
                čiarkou. <strong>Predikáty</strong> sa píšu oddelené čiarkami, vo
                formáte <code>predikat/arita</code>. <strong>Funkcie</strong> sa píšu oddelené čiarkami, vo
                formáte <code>funkcia/arita</code>.
            </Popover>
        );
        return (
            <div className='language-editor'>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass='h2'>Jazyk 𝓛</Panel.Title>
                        <OverlayTrigger trigger='click' placement='bottom' overlay={popoverHelp}>
                            <span>?</span>
                        </OverlayTrigger>
                    </Panel.Heading>
                    <Panel.Body>
                        <div className={'bs-example-form'}>
                            <Row>
                                <Col lg={12}>
                                    <fieldset>
                                        <legend>Symboly konštánt</legend>
                                        <FormGroup validationState={this.state.constants_error != '' ? 'error' : null}>
                                            <InputGroup>
                                                <label className='input-group-addon' htmlFor='language-constants'>{'𝓒'}<sub>{'𝓛'}</sub></label>
                                                <FormControl id='language-constants' type='text' onChange={(e) => this.updateConstants(e)}
                                                             onFocus={(e) => this.updateConstants(e)}/>
                                            </InputGroup>
                                            <HelpBlock>{this.state.constants_error}</HelpBlock>
                                        </FormGroup>
                                    </fieldset>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <fieldset>
                                        <legend>Predikátové symboly</legend>
                                        <FormGroup validationState={this.state.predicates_error != '' ? 'error' : null}>
                                            <InputGroup>
                                                <label className='input-group-addon' htmlFor='language-predicates'>{'𝓟'}<sub>{'𝓛'}</sub></label>
                                                <FormControl id='language-predicates' type='text' onChange={(e) => this.updatePredicates(e)}
                                                             onFocus={(e) => this.updatePredicates(e)}/>
                                            </InputGroup>
                                            <HelpBlock>{this.state.predicates_error}</HelpBlock>
                                        </FormGroup>
                                    </fieldset>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <fieldset>
                                        <legend>Funkčné symboly</legend>
                                        <FormGroup com validationState={this.state.functions_error != '' ? 'error' : null}>
                                            <InputGroup>
                                                <label className='input-group-addon' htmlFor='language-functions'>{'𝓕'}<sub>{'𝓛'}</sub></label>
                                                <FormControl id='language-functions' type='text' onChange={(e) => this.updateFunctions(e)}
                                                             onFocus={(e) => this.updateFunctions(e)}/>
                                            </InputGroup>
                                            <HelpBlock>{this.state.functions_error}</HelpBlock>
                                        </FormGroup>
                                    </fieldset>
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