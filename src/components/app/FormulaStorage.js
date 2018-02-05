import React from 'react';
import {Row, Col, Panel, Button, FormGroup, InputGroup, FormControl, HelpBlock} from 'react-bootstrap';

import Language from "../../backend/Language";
import Conjunction from "../../backend/formula/Formula.Conjunction";
import Disjunction from "../../backend/formula/Formula.Disjunction";
import Implication from "../../backend/formula/Formula.Implication";
import Variable from "../../backend/term/Term.Variable";
import Constant from "../../backend/term/Term.Constant";
import ExistentialQuant from "../../backend/formula/Formula.ExistentialQuant";
import UniversalQuant from "../../backend/formula/Formula.UniversalQuant";
import FunctionTerm from "../../backend/term/Term.FunctionTerm";
import PredicateAtom from "../../backend/formula/Formula.PredicateAtom";
import Negation from "../../backend/formula/Formula.Negation";
import EqualityAtom from "../../backend/formula/Formula.EqualityAtom";

class FormulaStorage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formulas: []
        };
    }

    render() {
        return (
            <div className='formula-storage'>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title>Formuly</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {
                            this.state.formulas.map((current, index) =>
                                <Row key={index}>
                                    <Col lg={12}>
                                        <FormGroup validationState={current.satisfied ? 'success' : 'error'}>
                                            <InputGroup>
                                                <InputGroup.Button>
                                                    <Button onClick={() => this.deleteFormula(index)}>✖</Button>
                                                </InputGroup.Button>
                                                <FormControl type='text' value={current.formula}
                                                             onChange={(e) => this.checkFormula(e, index)}/>
                                            </InputGroup>
                                            <FormControl.Feedback  />
                                            <HelpBlock>{current.validationMessage}</HelpBlock>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            )
                        }
                        <Button bsStyle='success' onClick={() => this.addFormula()}>➕ Pridaj formulu</Button>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }

    addFormula() {
        let formulas = this.state.formulas;
        formulas.push({
            formula: '',
            valid: true,
            validationMessage: '',
            formulaObj: null,
            satisfied: false
        });
        this.setState({
            formulas: formulas
        });
    }

    deleteFormula(i) {
        this.setState({
            formulas: this.state.formulas.filter((_, index) => i !== index)
        });
    }

    setParserOptions() {
        return {
            structure: this.props.structure,
            conjunction: Conjunction,
            disjunction: Disjunction,
            implication: Implication,
            variable: Variable,
            constant: Constant,
            existentialQuant: ExistentialQuant,
            universalQuant: UniversalQuant,
            functionTerm: FunctionTerm,
            predicate: PredicateAtom,
            negation: Negation,
            equalityAtom: EqualityAtom
        }
    }

    checkFormula(e, index) {
        let givenFormula = e.target.value;
        let options = this.setParserOptions();
        let formulas = this.state.formulas;
        formulas[index].formula = givenFormula;
        let parser = require('../../backend/parser/grammar.js');
        try {
            let formula = null;
            if (givenFormula.length > 0) {
                formula = parser.parse("(" + givenFormula + ")", options);
            }
            console.log('formula:', formula);
            let sat = this.evaluateFormula(formula);
            formulas[index].validationMessage = '';
            formulas[index].valid = true;
            formulas[index].formulaObj = formula;
            formulas[index].satisfied = sat;
            console.log('vysledna formula:', formulas[index]);
        } catch (e) {
            console.error(e);
            formulas[index].validationMessage = e.message;
            formulas[index].valid = false;
            formulas[index].formulaObj = null;
            formulas[index].satisfied = false;
        }
        this.setState({
            formulas: formulas
        });
    }

    evaluateFormula(formula) {
        let e = new Map();
        e.set('x', 'a');
        e.set('y', 'b');
        let sat = formula.isSatisfied(this.props.structure, e);
        return sat;
    }

}

export default FormulaStorage;