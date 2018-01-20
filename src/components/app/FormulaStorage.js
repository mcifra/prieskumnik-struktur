import React from 'react';
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
            formulas: [],
        };
    }

    render() {
        // console.log('JAZYK: ', this.props.language);
        return (
            <div className={"formula-storage"}>
                <h2>Formuly</h2>
                {
                    this.state.formulas.map((current, index) =>
                        <div className={'row'}>
                            <div className={'col-lg-6'}>
                                <div className={'input-group'} key={index}>
                                    <span class="input-group-addon" for="predicates-list">{current.ok}</span>
                                    <input className={'form-control'} type={"text"} value={current.formula}
                                           onChange={(e) => this.checkFormula(e, index)}/>
                                    <span className={'input-group-btn'}>
                                        <button className={'btn btn-danger'}
                                                onClick={() => this.deleteFormula(index)}>Odstrániť</button>
                                        {/*{current.validationMessage}*/}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }
                <button className={'btn btn-primary'} id={"add-formula"} onClick={() => this.addFormula()}>Pridaj
                </button>
            </div>
        );
    }

    addFormula() {
        var formulas = this.state.formulas;
        formulas.push({
            formula: '',
            valid: false,
            validationMessage: '',
            formulaObj: null,
            ok: false
        });
        // console.log(this.state);
        this.setState({
            formulas: formulas
        });
    }

    deleteFormula(i) {
        this.setState({
            formulas: this.state.formulas.filter((_, index) => i !== index)
        });
    }

    getOptions() {
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
        let options = this.getOptions();
        let formulas = this.state.formulas;
        formulas[index].formula = givenFormula;
        let parser = require('../../backend/parser/grammar.js');
        try {
            let formula = null;
            if (givenFormula.length > 0) {
                formula = parser.parse("(" + givenFormula + ")", options);
            }
            console.log('formula:', formula);
            //console.log('formula JSON:', JSON.stringify(formula));

            let ok = this.evaluateFormula(formula);

            if (!ok){
                ok='✘';
            }else{
                ok='✔';
            }

            formulas[index].validationMessage = '';
            formulas[index].valid = true;
            formulas[index].formulaObj = formula;
            formulas[index].ok=ok;

            console.log(formulas[index]);

        } catch (e) {
            console.error('parser chyba:', e);
            formulas[index].validationMessage = e.message;
            formulas[index].valid = false;
            formulas[index].formulaObj = null;
            formulas[index].ok='✘';
        }
        this.setState({
            formulas: formulas
        });
    }

    evaluateFormula(formula) {
        let e = new Map();
        e.set('x','a');
        e.set('y','b');

        let ok = formula.isSatisfied(this.props.structure,e);
        console.log(ok);
        return ok;
    }

}

export default FormulaStorage;