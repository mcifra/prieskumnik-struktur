import React from 'react';

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
            <div className={'language-editor'}>
                <h2>Jazyk</h2>
                <div className={'bs-example-form'}>
                    <div className={'row'}>
                        <div className={'col-lg-12'}>
                            <div className={'input-group'}>
                                <span className={'input-group-addon'} htmlFor={"constants-list"}>Konštanty</span>
                                <input className={'form-control'} type={"text"} id={"constants-list"}
                                       key={"constants-list"}
                                       onChange={(e) => this.updateConstants(e)}
                                       onFocus={(e) => this.updateConstants(e)}/>
                            </div>
                        </div>
                        <div className={'col-lg-12'}>
                            {
                                this.state.constants_error !== null ? (
                                    <div className={'alert alert-danger'}>
                                        {
                                            this.state.constants_error.location !== undefined ? (
                                                this.state.constants_error.message + " on position " + (this.state.constants_error.location.start.offset + 1)
                                            ) : (
                                                this.state.constants_error.message
                                            )
                                        }
                                    </div>
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
                                       onChange={(e) => this.updatePredicates(e)}
                                       onFocus={(e) => this.updatePredicates(e)}/>
                            </div>
                        </div>
                        <div className={'col-lg-12'}>
                            {
                                this.state.predicates_error !== null ? (
                                    <div className={'alert alert-danger'}>
                                        {
                                            this.state.predicates_error.location !== undefined ? (
                                                this.state.predicates_error.message + " on position " + (this.state.predicates_error.location.start.offset + 1)
                                            ) : (
                                                this.state.predicates_error.message
                                            )
                                        }
                                    </div>
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
                                       onChange={(e) => this.updateFunctions(e)}
                                       onFocus={(e) => this.updateFunctions(e)}/>
                            </div>
                        </div>
                        <div className={'col-lg-12'}>
                            {
                                this.state.functions_error !== null ? (
                                    <div className={'alert alert-danger'}>
                                        {
                                            this.state.functions_error.location !== undefined ? (
                                                this.state.functions_error.message + " on position " + (this.state.functions_error.location.start.offset + 1)
                                            ) : (
                                                this.state.functions_error.message
                                            )
                                        }
                                    </div>
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
        console.log('e: ',e.target.value);
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