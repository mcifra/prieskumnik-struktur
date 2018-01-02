import React from 'react';

class ConstantValueEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var domainItems=[...this.props.domain];
        return (
            <div className={'col-lg-4'}>
                <label htmlFor={'domain-items-constant'}>{'i(' + this.props.constantName + '): '}</label>
                <select className={'form-control'} id={'domain-items-constant'}>
                    {
                        domainItems.map((current,index)=>
                            <option value={current}>{current}</option>
                        )
                    }
                </select>
            </div>
        )
    }
}

export default ConstantValueEditor;