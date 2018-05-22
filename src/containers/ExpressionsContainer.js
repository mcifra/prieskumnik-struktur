import {connect} from 'react-redux';
import Expressions from "../components/Expressions";
import {
  addExpression,
  checkExpressionSyntax,
  lockExpressionAnswer,
  lockExpressionValue,
  removeExpression,
  setExpressionAnswer
} from "../actions";

const mapStateToProps = (state) => ({
  formulas: state.expressions.formulas,
  terms: state.expressions.terms,
  domain: [...state.structureObject.domain],
  teacherMode: state.common.teacherMode
});

const mapDispatchToProps = {
  onInputChange: checkExpressionSyntax,
  addExpression: addExpression,
  removeExpression: removeExpression,
  setExpressionAnswer: setExpressionAnswer,
  lockExpressionValue: lockExpressionValue,
  lockExpressionAnswer: lockExpressionAnswer
};

const ExpressionContainer = connect(
   mapStateToProps,
   mapDispatchToProps
)(Expressions);

export default ExpressionContainer;