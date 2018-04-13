import {connect} from 'react-redux';
import Expressions from "../components/app/Expressions";
import {
   addExpression,
   checkExpressionSyntax,
   lockExpressionAnswer,
   lockExpressionValue,
   removeExpression,
   setExpressionAnswer
} from "../actions";

const mapStateToProps = (state) => {
   return {
      formulas: state.expressions.formulas,
      terms: state.expressions.terms,
      domain: [...state.structure.domain],
      mode: state.mode
   }
};

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