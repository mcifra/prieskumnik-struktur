import React from 'react';

class PredicateEditor extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div className={'col-lg-12'}>
                <label>{this.props.predicateName}</label>
                <input type={"text"} onChange={(e) => this.handleChange(e)}/>
            </div>
        )
    }

    handleChange(e) {
        this.props.onChange(this.props.predicateName, e.target.value);
    }

}

export default PredicateEditor;