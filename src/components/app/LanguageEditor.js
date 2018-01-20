import React from 'react';

class LanguageEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            constants_error: null,
            predicates_error: null,
            functions_error: null
        };
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
                                       onChange={(e) => this.updateConstants(e)}/>
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
                                       onChange={(e) => this.updatePredicates(e)}/>
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
                                       onChange={(e) => this.updateFunctions(e)}/>
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

    updateConstants(e) {
        // this.setState({
        //     constants_error: null,
        //     predicates_error: this.state.predicates_error,
        //     functions_error: this.state.functions_error
        // });
        let parser = require('../../backend/parser/grammar');
        let inputValue = e.target.value;
        let language = this.props.language;
        try {
            let parsedValue = [];
            if (inputValue.length > 0)
                parsedValue = parser.parse(inputValue, {startRule: 'language_constants_list'});
            language.setConstants(new Set(parsedValue));
            this.props.onChange(language);
        } catch (e) {
            console.error(e);
            // this.setState({
            //     language: this.state.language,
            //     constants_error: e,
            //     predicates_error: this.state.predicates_error,
            //     functions_error: this.state.functions_error
            // });
        }
    }

    updatePredicates(e) {
        // this.setState({
        //     constants_error: this.state.constants_error,
        //     predicates_error: null,
        //     functions_error: this.state.functions_error
        // });
        let parser = require('../../backend/parser/grammar');
        let inputValue = e.target.value;
        let language = this.props.language;
        try {
            let parsedValue = [];
            if (inputValue.length > 0)
                parsedValue = parser.parse(inputValue, {startRule: 'language_predicates_list'});
            let newPredicates = new Map();
            for (let i = 0; i < parsedValue.length; i++) {
                newPredicates.set(parsedValue[i].name, parsedValue[i].arity);
            }
            language.setPredicates(newPredicates);
            this.props.onChange(language);
        } catch (e) {
            console.error(e);
            // this.setState({
            //     language: this.state.language,
            //     constants_error: this.state.constants_error,
            //     predicates_error: e,
            //     functions_error: this.state.functions_error
            // });
        }
    }

    updateFunctions(e) {
        // this.setState({
        //     constants_error: this.state.constants_error,
        //     predicates_error: this.state.predicates_error,
        //     functions_error: null
        // });
        let parser = require('../../backend/parser/grammar');
        let inputValue = e.target.value;
        let language = this.props.language;
        try {
            let parsedValue = [];
            if (inputValue.length > 0)
                parsedValue = parser.parse(inputValue, {
                    startRule: 'language_functions_list',
                    language: this.props.language
                });
            let newFunctions = new Map();
            for (let i = 0; i < parsedValue.length; i++) {
                newFunctions.set(parsedValue[i].name, parsedValue[i].arity);
            }
            language.setFunctions(newFunctions);
            this.props.onChange(language);
        } catch (e) {
            console.error(e);
            // this.setState({
            //     language: this.state.language,
            //     constants_error: this.state.constants_error,
            //     predicates_error: this.state.predicates_error,
            //     functions_error: e
            // });
        }
    }
}

export default LanguageEditor;