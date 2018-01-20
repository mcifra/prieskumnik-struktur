import React from 'react';

class FunctionEditor extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div className={'col-lg-12'}>
                <label>{this.props.functionName}</label>
                <input type={"text"} onChange={(e) => this.handleChange(e)}/>
            </div>
        )
    }

    handleChange(e) {
        this.props.onChange(this.props.functionName, e.target.value);
    }

}

export default FunctionEditor;