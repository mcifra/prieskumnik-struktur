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
                    <div className={'col-lg-6'}>
                        <div className={'input-group'}>
                            <span className={'input-group-addon'} htmlFor={'domain'}>Doména</span>
                            <input className={'form-control'} id={'domain'} type={'text'}
                                   onChange={(e) => this.updateDomain(e)}/>
                        </div>
                    </div>
                    <div className={'col-lg-6'}>
                        {
                            this.state.domain_error !== '' ? (
                                <div className={'alert alert-danger'}>{this.state.domain_error}</div>
                            ) : (
                                ''
                            )
                        }
                    </div>
                </div>
                {
                    constants.map((current, index) =>
                        <div className={'row'}>
                            <div className={'col-lg-6'}>
                                <ConstantValueEditor constantName={current} key={index}
                                                     domain={this.props.structure.domain}/>
                            </div>
                        </div>
                    )
                }
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
            var res = parser.parse(items);
            this.props.onDomainChange(res);
        } catch (e) {
            this.setState({
                domain_error: e.message
            });
        }
    }
}

export default StructureEditor;