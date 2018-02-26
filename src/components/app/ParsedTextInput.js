import React from 'react';
import {FormGroup, InputGroup, FormControl, HelpBlock} from 'react-bootstrap';

class ParsedTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ''
        };
        this.parser = require('../../backend/parser/grammar');
    }

    render() {
        return (
            <FormGroup validationState={this.state.errorMessage !== '' ? 'error' : null}>
                <InputGroup>
                    <label className='input-group-addon'
                           htmlFor={this.props.id}>{this.props.label}</label>
                    <FormControl id={this.props.id} type='text' onChange={(e) => this.handleChange(e)}/>
                </InputGroup>
                <HelpBlock>{this.state.errorMessage}</HelpBlock>
            </FormGroup>
        )
    }

    handleChange(e) {
        let inputValue = e.target.value;
        this.setState({
            errorMessage: ''
        });
        try {
            let parsedValue = [];
            if (inputValue.length > 0)
                parsedValue = this.parser.parse(inputValue,  this.props.parserOptions);
            this.props.onChange(parsedValue);
        } catch (e) {
            console.error(e);
            this.setState({
                errorMessage: e.message
            });
        }
    }
}

export default ParsedTextInput;