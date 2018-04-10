// zmena inputu pre konstanty (editor jazyka)
export function setConstants(value) {
    return {
        type: 'SET_CONSTANTS',
        value: value,
        error: '',
        locked: false
    }
}

// zmena inputu pre predikaty (editor jazyka)
export function setPredicates(value) {
    return {
        type: 'SET_PREDICATES',
        value: value,
        error: '',
        locked: false
    }
}

// zmena inputu pre funkcie (editor jazyka)
export function setFunctions(value) {
    return {
        type: 'SET_FUNCTIONS',
        value: value,
        error: '',
        locked: false
    }
}

// zmena inputu pre domenu (editor struktury)
export function setDomain(value) {
    return {
        type: 'SET_DOMAIN',
        value: value,
        error: '',
        locked: false
    }
}

export function setConstantValue(value, constantName) {
    return {
        type: 'SET_CONSTANT_VALUE',
        constantName: constantName,
        value: value,
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

export const addFormula = () => ({
    type: 'ADD_FORMULA'
});

export const addTerm = () => ({
    type: 'ADD_TERM'
});

export const removeFormula = (index) => ({
    type: 'REMOVE_FORMULA',
    index
});

export const removeTerm = (index) => ({
    type: 'REMOVE_TERM',
    index
});

export const setFormulaAnswer = (answer, index) => ({
    type: 'SET_FORMULA_ANSWER',
    answer,
    index
});

export const setTermAnswer = (answer, index) => ({
    type: 'SET_TERM_ANSWER',
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