import React from 'react';
import {Row, Col, Popover, OverlayTrigger} from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';

import ParsedTextInput from "./ParsedTextInput";

class LanguageEditor extends React.Component {
    constructor(props) {
        super(props);
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
        const constantsParserOptions = {startRule: 'language_constants_list'};
        const predicatesParserOptions = {startRule: 'language_predicates_list'};
        const functionsParserOptions = {startRule: 'language_functions_list'};
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
                                        <ParsedTextInput id='language-constants' label={<span>𝓒<sub>𝓛</sub></span>}
                                                             onChange={(parsedValue)=>this.updateConstants(parsedValue)}
                                                             parserOptions={constantsParserOptions} />
                                    </fieldset>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <fieldset>
                                        <legend>Predikátové symboly</legend>
                                        <ParsedTextInput id='language-predicates' label={<span>𝓟<sub>𝓛</sub></span>}
                                                         onChange={(parsedValue)=>this.updatePredicates(parsedValue)}
                                                         parserOptions={predicatesParserOptions} />
                                    </fieldset>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <fieldset>
                                        <legend>Funkčné symboly</legend>
                                        <ParsedTextInput id='language-functions' label={<span>𝓕<sub>𝓛</sub></span>}
                                                             onChange={(parsedValue)=>this.updateFunctions(parsedValue)}
                                                             parserOptions={functionsParserOptions} />
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