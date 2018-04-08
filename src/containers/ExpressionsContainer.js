import {
    addFormula, addTerm, checkExpressionSyntax, removeFormula, removeTerm,
    setFormulaAnswer, setTermAnswer
} from "../actions/index";
import {connect} from 'react-redux';
import Expressions from "../components/app/Expressions";
import {lockExpressionAnswer, lockExpressionValue} from "../actions";

const mapStateToProps = (state) => ({
    formulas: state.expressions.formulas,
    terms: state.expressions.terms,
    domain: state.structure.domain
});

const mapDispatchToProps = {
    onInputChange: checkExpressionSyntax,
    addTerm: addTerm,
    addFormula: addFormula,
    removeFormula: removeFormula,
    removeTerm: removeTerm,
    setFormulaAnswer: setFormulaAnswer,
    setTermAnswer: setTermAnswer,
    lockExpressionValue: lockExpressionValue,
    lockExpressionAnswer: lockExpressionAnswer
};

const ExpressionContainer = connect (
    mapStateToProps,
    mapDispatchToProps
)(Expressions);

export default ExpressionContainer;