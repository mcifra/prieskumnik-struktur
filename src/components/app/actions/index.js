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

export function checkExpressionSyntax(value, index, expressionType) {
    return {
        type: 'CHECK_EXPRESSION_SYNTAX',
        value: value,
        index: index,
        expressionType: expressionType
    }
}

export function addExpression(expressionType) {
    return {
        type: 'ADD_EXPRESSION',
        expressionType
    }
}

export const setExpressionAnswer = (answer, expressionType, expressionIndex)  => ({
    type: 'SET_EXPRESSION_ANSWER',
    answer,
    expressionType,
    expressionIndex
});

export const setEditMode = (value, itemType, name) => ({
    type: 'SET_EDIT_MODE',
    value,
    itemType,
    name
});