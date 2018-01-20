import React from 'react';

class ConstantEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        let domainItems = [...this.props.domain];
        return (
            <div className={'col-lg-12'}>
                <label htmlFor={'domain-items-constant'}>{'i(' + this.props.constantName + '): '}</label>
                <select /*className={'form-control'}*/ id={'domain-items-constant'} onChange={(e) => this.handleChange(e)}>
                    {
                        domainItems.map((current, index) =>
                            <option value={current}>{current}</option>
                        )
                    }
                </select>
            </div>
        )
    }

    handleChange(e) {
        this.props.onChange(this.props.constantName, e.target.value);
    }
}

export default ConstantEditor;