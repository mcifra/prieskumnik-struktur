export const exportApp = () => ({
    type: 'EXPORT_APP'
});

export const importApp = () => ({
    type: 'IMPORT_APP'
});


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

export const setPredicateValue = (value, predicateName, domainItems = null) => ({
    type: 'SET_PREDICATE_VALUE',
    value,
    predicateName,
    domainItems
});

export const setFunctionValue = (value, functionName) => ({
    type: 'SET_FUNCTION_VALUE',
    value,
    functionName
});

export const checkExpressionSyntax = (value, index, expressionType) => ({
    type: 'CHECK_EXPRESSION_SYNTAX',
    value,
    index,
    expressionType
});

export const addExpression = (expressionType) => ({
    type: 'ADD_EXPRESSION',
    expressionType
});

export const deleteExpression = (expressionType, expressionIndex) => ({
    type: 'DELETE_EXPRESSION',
    expressionType,
    expressionIndex
});

export const setExpressionAnswer = (answer, expressionType, expressionIndex) => ({
    type: 'SET_EXPRESSION_ANSWER',
    answer,
    expressionType,
    expressionIndex
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

export const toggleTable = (itemType, name) => ({
    type: 'TOGGLE_EDIT_TABLE',
    itemType,
    name
});

export const setVariablesValue = (value) => ({
    type: 'SET_VARIABLES_VALUE',
    value
});