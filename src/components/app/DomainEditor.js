import React from 'react';

class DomainEditor extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div className={'col-lg-12'}>
                <label>Domena</label>
                <input type={"text"} onChange={(e) => this.handleChange(e)} onFocus={(e) => this.handleChange(e)}/>
            </div>
        )
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }
}

export default DomainEditor;