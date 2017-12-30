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


class FormulaStorage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formulas: [],
        };
    }

    render() {
        console.log('JAZYK: ', this.props.language);
        return (
            <div className={"formula-storage"}>
                <h2>Zoznam formúl</h2>
                {
                    this.state.formulas.map((current, index) =>
                        <div className={'row'}>
                            <div className={'col-lg-6'}>
                                <div className={'input-group'} key={index}>

                                    <input className={'form-control'} type={"text"} value={current.formula}
                                           onChange={(e) => this.checkFormula(e, index)}/>

                                    <span className={'input-group-btn'}>
                                    <button className={'btn btn-danger'} onClick={() => this.deleteFormula(index)}>Odstrániť</button>
                                        {/*{current.validationMessage}*/}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }
                <button className={'btn btn-primary'} id={"add-formula"} onClick={() => this.addFormula()}>Pridaj</button>
            </div>
        );
    }

    addFormula() {
        var formulas = this.state.formulas;
        formulas.push({
            formula: '',
            valid: false,
            validationMessage: '',
            formulaObj: null
        });
        console.log(this.state);
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
            language: this.props.language,
            conjunction: Conjunction,
            disjunction: Disjunction,
            implication: Implication,
            variable: Variable,
            constant: Constant,
            existentialQuant: ExistentialQuant,
            universalQuant: UniversalQuant,
            functionTerm: FunctionTerm,
            predicate: PredicateAtom,
            negation: Negation
        }
    }

    checkFormula(e, index) {
        var options = this.getOptions();
        var formulas = this.state.formulas;
        formulas[index].formula = e.target.value;
        var parser = require('../../backend/parser/grammar.js');
        try {
            var formula = parser.parse(e.target.value, options);
            console.log(formula);
            formulas[index].validationMessage = '';
            formulas[index].valid = true;
            formulas[index].formulaObj = formula;
        } catch (e) {
            console.error(e);
            formulas[index].validationMessage = e.message;
            formulas[index].valid = false;
            formulas[index].formulaObj = null;
        }
        this.setState({
            formulas: formulas
        });
    }
}

export default FormulaStorage;