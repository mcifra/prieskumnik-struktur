import {addExpression, checkExpressionSyntax, deleteExpression, setExpressionAnswer} from "../actions";
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
    deleteExpression: deleteExpression,
    onAnswerSelect: setExpressionAnswer
};

const ExpressionContainer = connect (
    mapStateToProps,
    mapDispatchToProps
)(Expressions);

export default ExpressionContainer;