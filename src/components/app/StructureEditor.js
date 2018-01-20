import React from 'react';
import ConstantEditor from './ConstantEditor';
import DomainEditor from "./DomainEditor";
import FunctionEditor from "./FunctionEditor";
import PredicateEditor from "./PredicateEditor";

class StructureEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            domain_error: '',
        };
    }

    setParserOptions(starRule) {
        return {
            startRule: starRule,
            language: this.props.language,
            structure: this.props.structure
        }
    }

    render() {
        let constants = [...this.props.language.constants];
        let predicates = [...this.props.language.predicates];
        let functions = [...this.props.language.functions];
        return (
            <div>
                <h2>Štruktúra</h2>
                <DomainEditor onChange={(items) => this.updateDomain(items)}/>
                {
                    constants.map((curr, i) =>
                        <ConstantEditor constantName={curr}
                                        onChange={(constantName, value) => this.updateConstantValue(constantName, value)}
                                        domain={this.props.structure.domain}/>
                    )
                }
                {
                    predicates.map((curr, i) =>
                        <PredicateEditor predicateName={curr[0]}
                                         onChange={(predicateName, value) => this.updatePredicateValue(predicateName, value)}/>
                    )
                }
                {
                    functions.map((curr, i) =>
                        <FunctionEditor functionName={curr[0]}
                                        onChange={(functionName, value) => this.updateFunctionValue(functionName, value)}/>
                    )
                }
            </div>
        )
        // return (
        //     <div className={'structure-editor'}>
        //         <h2>Štruktúra</h2>
        //         <div className={'row'}>
        //             <div className={'col-lg-12'}>
        //                 <div className={'input-group'}>
        //                     <span className={'input-group-addon'} htmlFor={'domain'}>Doména</span>
        //                     <input className={'form-control'} id={'domain'} type={'text'}
        //                            onChange={(e) => this.updateDomain(e)}/>
        //                 </div>
        //             </div>
        //             <div className={'col-lg-12'}>
        //                 {
        //                     this.state.domain_error !== '' ? (
        //                         <div className={'alert alert-danger'}>{this.state.domain_error}</div>
        //                     ) : (
        //                         ''
        //                     )
        //                 }
        //             </div>
        //         </div>
        //         <div className={'row'}>
        //             {
        //                 constants.map((current, index) =>
        //                     <ConstantValueEditor constantName={current} key={index}
        //                                          domain={this.props.structure.domain}/>
        //                 )
        //             }
        //         </div>
        //         <div className={"row"}>
        //             {
        //                 [...this.props.language.predicates].map((current, index) =>
        //                     <PredicateValueEditor structure={this.props.structure} predicateName={current[0]} predicateArity={current[1]} key={index}
        //                     onPredicateValueChange={(current[0], e) => this.updatePredicateValue(current[0],e)}/>
        //                 )
        //             }
        //         </div>
        //     </div>
        // );
    }

    updateDomain(items) {
        let parser = require('../../backend/parser/grammar');
        try {
            let itemsParsed = parser.parse(items, this.setParserOptions('domain_items_list'));
            let structure = this.props.structure;
            structure.setDomain(itemsParsed);
            this.props.onChange(structure);
        } catch (e) {
            console.error(e);
        }
    }

    updateConstantValue(constantName, value) {
        let structure = this.props.structure;
        structure.setConstantValue(constantName, value);
        this.props.onChange(structure);
    }

    updatePredicateValue(predicateName, value) {
        let parser = require('../../backend/parser/grammar');
        try {
            let valueParsed = parser.parse(value, this.setParserOptions('predicate_tuples_list'));
            let structure = this.props.structure;
            structure.setPredicateValue(predicateName, valueParsed);
            this.props.onChange(structure);
        } catch (e) {
            console.error(e);
        }
    }

    updateFunctionValue(functionName, value) {
        let parser = require('../../backend/parser/grammar');
        try {
            let valueParsed = parser.parse(value, this.setParserOptions('predicate_tuples_list'));
            let structure = this.props.structure;
            structure.setFunctionValue(functionName, valueParsed);
            this.props.onChange(structure);
        } catch (e) {
            console.error(e);
        }
    }
}

export default StructureEditor;