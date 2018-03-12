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