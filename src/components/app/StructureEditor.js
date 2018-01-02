import React from 'react';
import ConstantValueEditor from './ConstantValueEditor';

class StructureEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            domain_error: ''
        };
    }

    render() {
        var constants = [...this.props.language.constants];
        return (
            <div className={'structure-editor'}>
                <h2>Editor štruktúry</h2>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <div className={'input-group'}>
                            <span className={'input-group-addon'} htmlFor={'domain'}>Doména</span>
                            <input className={'form-control'} id={'domain'} type={'text'}
                                   onChange={(e) => this.updateDomain(e)}/>
                        </div>
                    </div>
                    <div className={'col-lg-12'}>
                        {
                            this.state.domain_error !== '' ? (
                                <div className={'alert alert-danger'}>{this.state.domain_error}</div>
                            ) : (
                                ''
                            )
                        }
                    </div>
                </div>
                <div className={'row'}>
                {
                    constants.map((current, index) =>


                                <ConstantValueEditor constantName={current} key={index}
                                                     domain={this.props.structure.domain}/>


                    )
                }
                </div>
            </div>
        );
    }

    updateDomain(e) {
        var items = e.target.value;
        var parser = require('../../backend/parser/structure_editor_domain');
        this.setState({
            domain_error: ''
        });
        try {
            let res = [];
            if (items.length > 0) {
                res = parser.parse(items);
            }
            this.props.onDomainChange(res);
        } catch (e) {
            console.error(e);
            this.setState({
                domain_error: e.message
            });
        }
    }
}

export default StructureEditor;