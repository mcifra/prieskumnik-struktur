import React from 'react';

class LanguageEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            constants_error: '',
            predicates_error: '',
            functions_erros: ''
        };
    }

    render() {
        return (
            <div className={'language-editor'}>
                <h2>Editor jazyka</h2>
                <div className={'bs-example-form'}>
                    <div className={'row'}>
                        <div className={'col-lg-12'}>

                            <div className={'input-group'}>
                                <span className={'input-group-addon'} htmlFor={"constants-list"}>Konštanty</span>
                                <input className={'form-control'} type={"text"} id={"constants-list"}
                                       key={"constants-list"}
                                       onChange={(e) => this.updateConstants(e)}/>
                            </div>
                        </div>
                        <div className={'col-lg-12'}>
                            {
                                this.state.constants_error !== '' ? (
                                    <div className={'alert alert-danger'}>{this.state.constants_error}</div>
                                ) : (
                                    ''
                                )
                            }
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-lg-12'}>

                            <div className={'input-group'}>
                                <span className={'input-group-addon'} htmlFor={"predicates-list"}>Predikáty</span>
                                <input className={'form-control'} type={"text"} id={"predicates-list"}
                                       key={"predicates-list"}
                                       onChange={(e) => this.updatePredicates(e)}/>
                            </div>
                        </div>
                        <div className={'col-lg-12'}>
                            {
                                this.state.predicates_error !== '' ? (
                                    <div className={'alert alert-danger'}>{this.state.predicates_error}</div>
                                ) : (
                                    ''
                                )
                            }
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-lg-12'}>

                            <div className={'input-group'}>
                                <span className={'input-group-addon'} htmlFor={"functions-list"}>Funkcie</span>
                                <input className={'form-control'} type={"text"} id={"functions-list"}
                                       key={"functions-list"}
                                       onChange={(e) => this.updateFunctions(e)}/>
                            </div>
                        </div>
                        <div className={'col-lg-12'}>
                            {
                                this.state.functions_erros !== '' ? (
                                    <div className={'alert alert-danger'}>{this.state.functions_erros}</div>
                                ) : (
                                    ''
                                )
                            }
                        </div>
                    </div>

                </div>

            </div>
        );
    }

    updateConstants(e) {
        this.setState({
            constants_error: '',
            predicates_error: this.state.predicates_error,
            functions_erros: this.state.functions_erros
        });
        let constantName = e.target.value;
        let parser = require('../../backend/parser/language_editor_constants.js');
        try {
            let res = [];
            if (e.target.value.length > 0) {
                res = parser.parse(constantName);
            }
            this.props.onConstantsChange(res);
        } catch (e) {
            console.error(e);
            this.setState({
                language: this.state.language,
                constants_error: e.message,
                predicates_error: this.state.predicates_error,
                functions_erros: this.state.functions_erros
            });
        }
    }

    updatePredicates(e) {
        this.setState({
            constants_error: this.state.constants_error,
            predicates_error: '',
            functions_erros: this.state.functions_erros
        });
        var parser = require('../../backend/parser/language_editor_predicates.js');
        try {
            var res = [];
            if (e.target.value.length > 0) {
                res = parser.parse(e.target.value);
            }
            this.props.onPredicatesChange(res);
        } catch (e) {
            console.error(e);
            this.setState({
                language: this.state.language,
                constants_error: this.state.constants_error,
                predicates_error: e.message,
                functions_erros: this.state.functions_erros
            });
        }
    }

    updateFunctions(e) {
        this.setState({
            constants_error: this.state.constants_error,
            predicates_error: this.state.predicates_error,
            functions_erros: ''
        });
        let parser = require('../../backend/parser/language_editor_functions.js');
        try {
            let res = [];
            if (e.target.value.length > 0) {
                res = parser.parse(e.target.value);
            }
            this.props.onFunctionsChange(res);
        } catch (e) {
            console.error(e);
            this.setState({
                language: this.state.language,
                constants_error: this.state.constants_error,
                predicates_error: this.state.predicates_error,
                functions_erros: e.message
            });
        }
    }
}

export default LanguageEditor;