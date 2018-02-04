import React from 'react';
import {Row, Col, InputGroup, FormControl} from 'react-bootstrap';

class StructureEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            domain_error: '',
        };
    }

    render() {
        let constants = [...this.props.structure.language.constants];
        let predicates = [...this.props.structure.language.predicates];
        let functions = [...this.props.structure.language.functions];
        let domain = [...this.props.structure.domain];
        return (
            <div>
                <h2>Štruktúra</h2>
                <Row>
                    <Col lg={12}>
                        <InputGroup>
                            <InputGroup.Addon>Doména</InputGroup.Addon>
                            <FormControl type="text"
                                         onChange={(items) => this.updateDomain(items)}
                                         onFocus={(items) => this.updateDomain(items)} key={"test"}/>
                        </InputGroup>
                    </Col>
                </Row>
                {
                    constants.map((curr, i) =>
                        <div className={"row"}>
                            <div className={'col-lg-12'}>
                                <div className={"input-group"}>
                                    <span className={'input-group-addon'}
                                          htmlFor={"constants-list"}>{curr}</span>
                                    <select className={'form-control'} id={'domain-items-constant'}
                                            onChange={(e) => this.updateConstantValue(curr, e)}>
                                        {
                                            domain.map((current, index) =>
                                                <option key={index} value={current}>{current}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    predicates.map((curr, i) =>
                        <div className={"row"}>
                            <div className={'col-lg-12'}>
                                <div className={"input-group"}>
                                    <span className={'input-group-addon'}
                                          htmlFor={"constants-list"}>{'P ' + curr[i][0]}</span>
                                    {/*<label>{this.props.predicateName}</label>*/}
                                    <input className={"form-control"} type={"text"}
                                           onChange={(e) => this.updatePredicateValue(curr[i][0], e)}/>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    functions.map((curr, i) =>
                        <div className={"row"}>
                            <div className={'col-lg-12'}>
                                <div className={"input-group"}>
                                    <span className={'input-group-addon'}
                                          htmlFor={"constants-list"}>{'F ' + curr[i][0]}</span>
                                    <input className={"form-control"} type={"text"}
                                           onChange={(e) => this.updateFunctionValue(curr[i][0], e)}/>
                                </div>
                            </div>
                        </div>
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
        items = items.target.value;
        let parser = require('../../backend/parser/grammar');
        let s = this.props.structure;
        try {
            s.clearDomain();
            if (items.length > 0) {
                let itemsParsed = parser.parse(items, {startRule: 'structure_domain_items_list', structure: s});
                s.setDomain(itemsParsed);
            }
            this.props.onChange(s);
        } catch (e) {
            console.error(e);
        }
    }

    updateConstantValue(constantName, value) {
        value = value.target.value;
        let structure = this.props.structure;
        structure.setConstantValue(constantName, value);
        this.props.onChange(structure);
    }

    updatePredicateValue(predicateName, value) {
        value = value.target.value;
        let parser = require('../../backend/parser/grammar');
        let structure = this.props.structure;
        try {
            let valueParsed = parser.parse(value, {
                startRule: 'structure_tuples_list',
                arity: structure.language.getPredicate(predicateName)
            });
            for (let i = 0; i < valueParsed.length; i++) {
                for (let j = 0; j < valueParsed[i].length; j++) {
                    if (!structure.domain.has(valueParsed[i][j])) {
                        throw 'Domena neobsahuje prvok ' + valueParsed[i][j];
                    }
                }
            }
            structure.setPredicateValue(predicateName, valueParsed);
            this.props.onChange(structure);
        } catch (e) {
            console.error(e);
        }
    }

    updateFunctionValue(functionName, value) {
        value = value.target.value;
        let parser = require('../../backend/parser/grammar');
        let structure = this.props.structure;
        let arity = parseInt(structure.language.getFunction(functionName));
        try {
            let valueParsed = parser.parse(value, {
                startRule: 'structure_tuples_list',
                arity: arity + 1
            });
            structure.iFunction.clear();
            for (let i = 0; i < valueParsed.length; i++) {
                structure.setFunctionValue(functionName, valueParsed[i].slice(0, arity), valueParsed[i][arity]);
            }
            this.props.onChange(structure);
        } catch (e) {
            console.error(e);
        }
    }
}

export default StructureEditor;