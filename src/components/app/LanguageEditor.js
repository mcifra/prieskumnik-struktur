import React from 'react';
import {Row, Col, FormGroup, ControlLabel, InputGroup, FormControl, HelpBlock, Popover, OverlayTrigger} from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';

import LanguageEditorInput from './LanguageEditorInput';

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
                                        <LanguageEditorInput id='language-constants' label='𝓒'
                                                             onChange={(parsedValue)=>this.updateConstants(parsedValue)}
                                                             startRule='language_constants_list' />
                                    </fieldset>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <fieldset>
                                        <legend>Predikátové symboly</legend>
                                        <LanguageEditorInput id='language-predicates' label='𝓟'
                                                             onChange={(parsedValue)=>this.updatePredicates(parsedValue)}
                                                             startRule='language_predicates_list' />
                                    </fieldset>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <fieldset>
                                        <legend>Funkčné symboly</legend>
                                        <LanguageEditorInput id='language-functions' label='𝓕'
                                                             onChange={(parsedValue)=>this.updateFunctions(parsedValue)}
                                                             startRule='language_functions_list' />
                                    </fieldset>
                                </Col>
                            </Row>
                        </div>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }

    updateConstants(parsedValue) {
        this.props.structure.setLanguageConstants(parsedValue);
        this.props.onChange(this.props.structure);
    }

    updatePredicates(parsedValue) {
        this.props.structure.setLanguagePredicates(parsedValue);
        this.props.onChange(this.props.structure);
    }

    updateFunctions(parsedValue) {
        this.props.structure.setLanguageFunctions(parsedValue);
        this.props.onChange(this.props.structure);
    }
}

export default LanguageEditor;