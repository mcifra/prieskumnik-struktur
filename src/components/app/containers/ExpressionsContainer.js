import {addExpression, checkExpressionSyntax, setExpressionAnswer} from "../actions";
import {connect} from 'react-redux';
import Expressions from "../components/Expressions";

const mapStateToProps = (state) => ({
    formulas: state.expressions.formulas,
    terms: state.expressions.terms,
    domain: state.structure.domain
});

const mapDispatchToProps = {
    onInputChange: checkExpressionSyntax,
    addExpression: addExpression,
    onAnswerSelect: setExpressionAnswer
};

const ExpressionContainer = connect (
    mapStateToProps,
    mapDispatchToProps
)(Expressions);

export default ExpressionContainer;