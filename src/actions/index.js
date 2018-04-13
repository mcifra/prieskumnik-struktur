// zmena inputu pre konstanty (editor jazyka)
export function setConstants(value) {
   return {
      type: 'SET_CONSTANTS',
      value
   }
}

// zmena inputu pre predikaty (editor jazyka)
export function setPredicates(value) {
   return {
      type: 'SET_PREDICATES',
      value
   }
}

// zmena inputu pre funkcie (editor jazyka)
export function setFunctions(value) {
   return {
      type: 'SET_FUNCTIONS',
      value
   }
}

// zmena inputu pre domenu (editor struktury)
export function setDomain(value) {
   return {
      type: 'SET_DOMAIN',
      value
   }
}

export function setConstantValue(value, constantName) {
   return {
      type: 'SET_CONSTANT_VALUE',
      constantName,
      value,
   }
}

export const setPredicateValueText = (value, predicateName) => ({
   type: 'SET_PREDICATE_VALUE_TEXT',
   value,
   predicateName
});

export const setPredicateValueTable = (value, predicateName, checked) => ({
   type: 'SET_PREDICATE_VALUE_TABLE',
   value,
   predicateName,
   checked
});

export const setFunctionValueText = (value, functionName) => ({
   type: 'SET_FUNCTION_VALUE_TEXT',
   value,
   functionName
});

export const setFunctionValueTable = (value, functionName) => ({
   type: 'SET_FUNCTION_VALUE_TABLE',
   value,
   functionName
});

export const checkExpressionSyntax = (value, index, expressionType) => ({
   type: 'CHECK_SYNTAX',
   value,
   index,
   expressionType
});

export const addExpression = (expressionType) => ({
   type: 'ADD_EXPRESSION',
   expressionType
});

export const removeExpression = (expressionType, index) => ({
   type: 'REMOVE_EXPRESSION',
   expressionType,
   index
});

export const setExpressionAnswer = (expressionType, answer, index) => ({
   type: 'SET_EXPRESSION_ANSWER',
   expressionType,
   answer,
   index
});

export const lockExpressionValue = (expressionType, expressionIndex) => ({
   type: 'LOCK_EXPRESSION_VALUE',
   expressionType,
   expressionIndex
});

export const lockExpressionAnswer = (expressionType, expressionIndex) => ({
   type: 'LOCK_EXPRESSION_ANSWER',
   expressionType,
   expressionIndex
});

export const lockConstants = () => ({
   type: 'LOCK_CONSTANTS'
});

export const lockPredicates = () => ({
   type: 'LOCK_PREDICATES'
});

export const lockFunctions = () => ({
   type: 'LOCK_FUNCTIONS'
});

export const lockDomain = () => ({
   type: 'LOCK_DOMAIN'
});

export const lockConstantValue = (constantName) => ({
   type: 'LOCK_CONSTANT_VALUE',
   constantName
});

export const lockPredicateValue = (predicateName) => ({
   type: 'LOCK_PREDICATE_VALUE',
   predicateName
});

export const lockFunctionValue = (functionName) => ({
   type: 'LOCK_FUNCTION_VALUE',
   functionName
});

export const lockVariables = () => ({
   type: 'LOCK_VARIABLES'
});


export const toggleTable = (itemType, name) => ({
   type: 'TOGGLE_EDIT_TABLE',
   itemType,
   name
});

export const setVariablesValue = (value) => ({
   type: 'SET_VARIABLES_VALUE',
   value
});

export const setMode = (mode) => ({
   type: 'SET_MODE',
   mode
});