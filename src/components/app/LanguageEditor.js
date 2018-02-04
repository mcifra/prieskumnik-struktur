import React from 'react';
import {Row, Col, FormGroup, ControlLabel, InputGroup, FormControl, HelpBlock} from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';

class LanguageEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            constants_error: null,
            predicates_error: null,
            functions_error: null
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
                                    <FormGroup>
                                        <ControlLabel htmlFor='language-constants'>Konštanty</ControlLabel>
                                        <InputGroup>
                                            <InputGroup.Addon>{'𝓒'}<sub>{'𝓛'}</sub>{' = {'}</InputGroup.Addon>
                                            <FormControl id='language-constants' type='text' onChange={(e) => this.updateConstants(e)}
                                                         onFocus={(e) => this.updateConstants(e)}/>
                                            <InputGroup.Addon>{"}"}</InputGroup.Addon>
                                        </InputGroup>
                                        <HelpBlock>Help text with validation state.</HelpBlock>
                                    </FormGroup>
                                </Col>
                                {/*<div className={'col-lg-12'}>*/}
                                    {/*{*/}
                                        {/*this.state.constants_error !== null ? (*/}
                                            {/*<div className={'alert alert-danger'}>*/}
                                                {/*{*/}
                                                    {/*this.state.constants_error.location !== undefined ? (*/}
                                                        {/*this.state.constants_error.message + " on position " + (this.state.constants_error.location.start.offset + 1)*/}
                                                    {/*) : (*/}
                                                        {/*this.state.constants_error.message*/}
                                                    {/*)*/}
                                                {/*}*/}
                                            {/*</div>*/}
                                        {/*) : (*/}
                                            {/*''*/}
                                        {/*)*/}
                                    {/*}*/}
                                {/*</div>*/}
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <FormGroup>
                                        <ControlLabel htmlFor='language-predicates'>Predikáty</ControlLabel>
                                        <InputGroup>
                                            <InputGroup.Addon>{'𝓟'}<sub>{'𝓛'}</sub>{' = {'}</InputGroup.Addon>
                                            <FormControl id='language-predicates' type='text' onChange={(e) => this.updatePredicates(e)}
                                                onFocus={(e) => this.updatePredicates(e)}/>
                                            <InputGroup.Addon>{"}"}</InputGroup.Addon>
                                        </InputGroup>
                                        <HelpBlock>Help text with validation state.</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>
                            {/*<div className={'row'}>*/}
                                {/*<div className={'col-lg-12'}>*/}

                                    {/*<div className={'input-group'}>*/}
                                        {/*<span className={'input-group-addon'}*/}
                                              {/*htmlFor={"predicates-list"}>Predikáty</span>*/}
                                        {/*<input className={'form-control'} type={"text"} id={"predicates-list"}*/}
                                               {/*key={"predicates-list"}*/}
                                               {/*onChange={(e) => this.updatePredicates(e)}*/}
                                               {/*onFocus={(e) => this.updatePredicates(e)}/>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className={'col-lg-12'}>*/}
                                    {/*{*/}
                                        {/*this.state.predicates_error !== null ? (*/}
                                            {/*<div className={'alert alert-danger'}>*/}
                                                {/*{*/}
                                                    {/*this.state.predicates_error.location !== undefined ? (*/}
                                                        {/*this.state.predicates_error.message + " on position " + (this.state.predicates_error.location.start.offset + 1)*/}
                                                    {/*) : (*/}
                                                        {/*this.state.predicates_error.message*/}
                                                    {/*)*/}
                                                {/*}*/}
                                            {/*</div>*/}
                                        {/*) : (*/}
                                            {/*''*/}
                                        {/*)*/}
                                    {/*}*/}
                                {/*</div>*/}
                            {/*</div>*/}

                            <Row>
                                <Col lg={12}>
                                    <FormGroup validationState='error'>
                                        <ControlLabel htmlFor='language-functions'>Funkcie</ControlLabel>
                                        <InputGroup>
                                            <InputGroup.Addon>{'𝓕'}<sub>{'𝓛'}</sub>{' = {'}</InputGroup.Addon>
                                                <FormControl id='language-functions' type='text' onChange={(e) => this.updateFunctions(e)}
                                                onFocus={(e) => this.updateFunctions(e)}/>
                                                <InputGroup.Addon>{"}"}</InputGroup.Addon>
                                        </InputGroup>
                                        <HelpBlock>Help text with validation state.</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>

                            {/*<div className={'row'}>*/}
                                {/*<div className={'col-lg-12'}>*/}

                                    {/*<div className={'input-group'}>*/}
                                        {/*<span className={'input-group-addon'} htmlFor={"functions-list"}>Funkcie</span>*/}
                                        {/*<input className={'form-control'} type={"text"} id={"functions-list"}*/}
                                               {/*key={"functions-list"}*/}
                                               {/*onChange={(e) => this.updateFunctions(e)}*/}
                                               {/*onFocus={(e) => this.updateFunctions(e)}/>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className={'col-lg-12'}>*/}
                                    {/*{*/}
                                        {/*this.state.functions_error !== null ? (*/}
                                            {/*<div className={'alert alert-danger'}>*/}
                                                {/*{*/}
                                                    {/*this.state.functions_error.location !== undefined ? (*/}
                                                        {/*this.state.functions_error.message + " on position " + (this.state.functions_error.location.start.offset + 1)*/}
                                                    {/*) : (*/}
                                                        {/*this.state.functions_error.message*/}
                                                    {/*)*/}
                                                {/*}*/}
                                            {/*</div>*/}
                                        {/*) : (*/}
                                            {/*''*/}
                                        {/*)*/}
                                    {/*}*/}
                                {/*</div>*/}
                            {/*</div>*/}

                        </div>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }

    // componentDidMount() {
    //     this.props.structure.setLanguageConstants(this.lastConstantsValue);
    //     this.props.onChange(this.props.structure);
    // }

    updateConstants(e) {
        // this.lastConstantsValue = e.target.value;
        let parser = require('../../backend/parser/grammar');
        let inputValue = e.target.value;
        try {
            let parsedValue = [];
            //this.props.structure.language.clearConstants();
            if (inputValue.length > 0)
                parsedValue = parser.parse(inputValue, {startRule: 'language_constants_list'});
            // this.lastConstantsValue=parsedValue;
            console.log(parsedValue);
            this.props.structure.setLanguageConstants(parsedValue);
            this.props.onChange(this.props.structure);
        } catch (e) {
            console.error(e);
        }
    }

    updatePredicates(e) {
        let parser = require('../../backend/parser/grammar');
        let inputValue = e.target.value;
        try {
            let parsedValue = [];
            // this.props.structure.language.clearPredicates();
            if (inputValue.length > 0)
                parsedValue = parser.parse(inputValue, {startRule: 'language_predicates_list'});
            //console.log(parsedValue);
            this.props.structure.setLanguagePredicates(parsedValue);
            this.props.onChange(this.props.structure);
        } catch (e) {
            console.error(e);
        }
    }

    updateFunctions(e) {
        let parser = require('../../backend/parser/grammar');
        let inputValue = e.target.value;
        console.log('e: ', e.target.value);
        try {
            let parsedValue = [];
            // this.props.structure.language.clearFunctions();
            if (inputValue.length > 0)
                parsedValue = parser.parse(inputValue, {startRule: 'language_functions_list'});
            this.props.structure.setLanguageFunctions(parsedValue);
            this.props.onChange(this.props.structure);
        } catch (e) {
            console.error(e);
        }
    }
}

export default LanguageEditor;