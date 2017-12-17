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
            formulaOK: false,
            formula: ''
        };
        //this.handleClick = this.handleClick.bind(this);
        //this.deleteFormula = this.deleteFormula.bind(this);
    }

    render() {
        console.log(this.state.formulas);
        return (
            <div className="list">
                <ul>
                    {
                        this.state.formulas.map((current, index) =>
                            <li key={index}>
                                <span>{current}</span>
                                <button className={"delete-formula"}
                                        onClick={() => this.deleteFormula(index)}>Odstranit
                                </button>
                            </li>
                        )
                    }
                </ul>
                <input type={"text"} name={"formula"} id={"formula"} onChange={(e) => this.checkFormula(e)}
                       />
                {
                    this.state.formulaOK ? <span>OK</span> : <span>CHYBA</span>
                }
                <button id={"add-formula"} onClick={() => this.addFormula()}>Pridaj</button>
            </div>
        );
    }

    addFormula() {
        if (this.state.formulaOK) {
            this.setState({
                formulas: [...this.state.formulas, this.state.formula],
                formulaOK: false,
                formula: ''
            });
        }
    }

    deleteFormula(i) {
        this.setState({
            formulas: this.state.formulas.filter((_, index) => i !== index)
        });
    }

    getOptions() {
        return {
            language: Language,
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

    checkFormula(e) {
        var l = new Language();
        var options = this.getOptions();
        options.language = l;
        //console.log(options)
        var parser = require('../../backend/parser/grammar.js');
        try {
            var formula = parser.parse(e.target.value, options);
            console.log(formula);
            this.setState({
                formulaOK: true,
                formulas: this.state.formulas,
                formula: e.target.value
            });
        } catch (e) {
            console.error(e);
            this.setState({
                formulaOK: false,
                formulas: this.state.formulas,
                formula: ''
            });
        }
        //console.log(e.target.value);

    }
}

export default FormulaStorage;