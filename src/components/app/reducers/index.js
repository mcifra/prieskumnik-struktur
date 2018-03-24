import Language from '../../../backend/Language';
import Structure from '../../../backend/Structure';
import InvalidLanguageException from "../../../exceptions/InvalidLanguageException";
import Variable from "../../../backend/term/Term.Variable";
import ExistentialQuant from "../../../backend/formula/Formula.ExistentialQuant";
import Disjunction from "../../../backend/formula/Formula.Disjunction";
import EqualityAtom from "../../../backend/formula/Formula.EqualityAtom";
import PredicateAtom from "../../../backend/formula/Formula.PredicateAtom";
import Conjunction from "../../../backend/formula/Formula.Conjunction";
import Constant from "../../../backend/term/Term.Constant";
import UniversalQuant from "../../../backend/formula/Formula.UniversalQuant";
import Negation from "../../../backend/formula/Formula.Negation";
import FunctionTerm from "../../../backend/term/Term.FunctionTerm";
import Implication from "../../../backend/formula/Formula.Implication";

let parser = require('../../../backend/parser/grammar');

const defaultState = {
    structure: new Structure(new Language()),
    variableValues: new Map(),
    inputs: {
        constants: {value: '', error: '', locked: false},
        predicates: {value: '', error: '', locked: false},
        functions: {value: '', error: '', locked: false},
        variableValues: {value: '', error: '', locked: false},
        structure: {
            domain: {value: '', error: 'Doména nesmie byť prázdna', locked: false},
            constants: {},
            predicates: {},
            functions: {}
        },
    },
    expressions: {
        formulas: [],
        terms: []
    }
};

function rootReducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_CONSTANTS':
            return setConstants(state, action);
        case 'SET_PREDICATES':
            return setPredicates(state, action);
        case 'SET_FUNCTIONS':
            return setFunctions(state, action);
        case 'SET_DOMAIN':
            return setDomain(state, action);
        case 'SET_VARIABLES_VALUE':
            return setVariablesValue(state, action);
        case 'SET_CONSTANT_VALUE':
            return setConstantValue(state, action);
        case 'SET_PREDICATE_VALUE':
            return setPredicateValue(state, action);
        case 'SET_FUNCTION_VALUE':
            return setFunctionValue(state, action);
        case 'ADD_EXPRESSION':
            return addExpression(state, action);
        case 'DELETE_EXPRESSION':
            return deleteExpression(state, action);
        case 'CHECK_EXPRESSION_SYNTAX':
            return checkExpressionSyntax(state, action);
        case 'SET_EXPRESSION_ANSWER':
            return setExpressionAnswer(state, action);
        case 'TOGGLE_EDIT_TABLE':
            return toggleEditTable(state, action);
        default:
            return state;
    }
}

function setConstants(state, action) {
    let newState = copyState(state);
    parseAndSetConstants(action.value, newState);
    parseAndSetPredicates(newState.inputs.predicates.value, newState);
    parseAndSetFunctions(newState.inputs.functions.value, newState);
    //checkExpressions(newState);
    console.log('STATE:', newState);
    return newState;
}

function parseAndSetConstants(value, state) {
    state.inputs.constants.value = value;
    state.inputs.constants.error = '';
    let parsedValue = {error: null, items: []};
    try {
        if (value.length > 0) {
            parsedValue = parser.parse(value, {startRule: 'constants', structure: state.structure});
            console.log('parsed constants:', parsedValue);
        }
        state.structure.setLanguageConstants(parsedValue.items);
        if (parsedValue.error && parsedValue.error.message) {
            // chyba sposobena strukturou, napr. obsahuje konstantu
            // ktora uz je v jazyku
            state.inputs.constants.error = parsedValue.error.message;
            // + parsedValue.pos je pozicia kde je chyba
        }
        // state.inputs.structure.constants = {};
        let newInterpretInputs = {};
        for (let i = 0; i < parsedValue.items.length; i++) {
            if (state.inputs.structure.constants[parsedValue.items[i]])
                newInterpretInputs[parsedValue.items[i]] = state.inputs.structure.constants[parsedValue.items[i]];
            else
                newInterpretInputs[parsedValue.items[i]] = {
                    value: '',
                    error: 'Interpretačná hodnota konštanty nesmie byť prázdna',
                    locked: false
                };
        }
        state.inputs.structure.constants = newInterpretInputs;
    } catch (e) {
        // syntakticka chyba
        console.error(e);
        state.inputs.constants.error = e.message;
    }
}

function setPredicates(state, action) {
    let newState = copyState(state);
    parseAndSetPredicates(action.value, newState);
    parseAndSetConstants(newState.inputs.constants.value, newState);
    parseAndSetFunctions(newState.inputs.functions.value, newState);
    //checkExpressions(newState);
    console.log('STATE:', newState);
    return newState;
}

function parseAndSetPredicates(value, state) {
    state.inputs.predicates.value = value;
    state.inputs.predicates.error = '';
    let parsedValue = {error: null, items: []};
    let iPredicates = state.inputs.structure.predicates;
    try {
        if (value.length > 0) {
            parsedValue = parser.parse(value, {startRule: 'predicates', structure: state.structure});
            console.log('parsed predicates:', parsedValue);
        }
        state.structure.setLanguagePredicates(parsedValue.items);
        if (parsedValue.error && parsedValue.error.message)
            state.inputs.predicates.error = parsedValue.error.message;
        iPredicates = {};

        for (let i = 0; i < parsedValue.items.length; i++)
            iPredicates[parsedValue.items[i].name] = {value: '', error: '', locked: false, editMode: 'TEXT'};
    } catch (e) {
        console.error(e);
        state.inputs.predicates.error = e.message;
    }
    state.inputs.structure.predicates = iPredicates;
}

function setFunctions(state, action) {
    let newState = copyState(state);
    parseAndSetFunctions(action.value, newState);
    parseAndSetConstants(newState.inputs.constants.value, newState);
    parseAndSetPredicates(newState.inputs.predicates.value, newState);
    //checkExpressions(newState);
    console.log('STATE:', newState);
    return newState;
}

function parseAndSetFunctions(value, state) {
    state.inputs.functions.value = value;
    state.inputs.functions.error = '';
    let parsedValue = {error: null, items: []};
    let iFunctions = state.inputs.structure.functions;
    try {
        if (value.length > 0) {
            parsedValue = parser.parse(value, {startRule: 'functions', structure: state.structure});
            console.log('parsed functions:', parsedValue);
        }
        state.structure.setLanguageFunctions(parsedValue.items);
        if (parsedValue.error && parsedValue.error.message)
            state.inputs.functions.error = parsedValue.error.message;
        iFunctions = {};
        for (let i = 0; i < parsedValue.items.length; i++)
            iFunctions[parsedValue.items[i].name] = {value: '', error: '', locked: false};
    } catch (e) {
        console.error(e);
        state.inputs.functions.error = e.message;
    }
}

function setDomain(state, action) {
    let newState = copyState(state);
    let structure = newState.structure;
    let domainInput = newState.inputs.structure.domain;
    domainInput.value = action.value;
    domainInput.error = '';
    let parsedValue = {success: false, error: '', items: []};
    if (action.value.length === 0) {
        domainInput.error = 'Doména nesmie byť prázdna';
        structure.setDomain(new Set());
    } else {
        parsedValue = parseText(action.value, {startRule: 'domain'});
        console.log('Parsed domain:', parsedValue);
        if (parsedValue.success) {
            structure.setDomain(new Set(parsedValue.items));
        } else {
            domainInput.error = parsedValue.error;
        }
    }

    // Kontrola hodnot vsetkych konstant
    let it = newState.structure.iConstant.keys();
    let k = null;
    while (k = it.next().value) {
        if (!newState.structure.hasDomainItem(newState.structure.getConstantValue(k))) {
            newState.structure.iConstant.delete(k);
            newState.inputs.structure.constants[k].error = 'Interpretačná hodnota konštanty nesmie byť prázdna';
            newState.inputs.structure.constants[k].value = '';
        }
    }

    // Kontrola hodnot vsetkych predikatov
    let predicates = Object.keys(newState.inputs.structure.predicates);
    for (let i = 0; i < predicates.length; i++) {
        if (newState.inputs.structure.predicates[predicates[i]].editMode === 'TEXT')
            checkPredicateValue(newState, predicates[i]);
        else {
            let newValue = syncPredicateValue(newState.structure.domain, newState.structure.getPredicateValue(predicates[i]));
            newState.structure.setPredicateValue(predicates[i], newValue);
        }
    }

    // TODO skontrolovanie hodnot funkcii:

    console.log('STATE:', newState);
    return newState;
}

// pri zmene domeny a je editMode = TABLE
function syncPredicateValue(domain, value) {
    let res = [];
    for (let i = 0; i < value.length; i++) {
        let valid = true;
        for (let j = 0; j < value[i].length; j++) {
            if (!domain.has(value[i][j]))
                valid = false;
        }
        if (valid)
            res.push(value[i]);
    }
    return res;
}

// pri zmene domeny a je editMode = TEXT
function checkPredicateValue(state, name) {
    let iPredicate = state.inputs.structure.predicates[name];
    let parsedValue = parseText(iPredicate.value, {
        structure: state.structure,
        startRule: 'tuples',
        arity: state.structure.language.getPredicate(name)
    });
    if (parsedValue.success) {
        state.structure.setPredicateValue(name, parsedValue.items);
    }
    if (parsedValue.error && parsedValue.error.message)
        iPredicate.error = parsedValue.error.message;
    else
        iPredicate.error = '';
}

// pri zmene editMode z TABLE do TEXT
function predicateValueToString(value) {
    if (value === undefined)
        return '';
    let res = '';
    for (let i = 0; i < value.length; i++) {
        res += tupleToString(value[i]);
        if (i < value.length - 1)
            res += ', ';
    }
    return res;
}

function tupleToString(tuple) {
    if (tuple.length === 0)
        return '';
    if (tuple.length === 1)
        return tuple[0];
    let res = '(';
    for (let i = 0; i < tuple.length; i++) {
        res += tuple[i];
        if (i < tuple.length - 1)
            res += ', ';
    }
    res += ')';
    return res;
}

function parseText(value, options) {
    let parsedValue = {};
    try {
        parsedValue = parser.parse(value, options);
        parsedValue.success = true;

    } catch (e) {
        console.error(e);
        parsedValue.success = false;
        parsedValue.error = e.message;
    }
    console.log('Parsed value in parseText():', parsedValue);
    return parsedValue;
}

function setVariablesValue(state, action) {
    let newState = copyState(state);
    let parsedValue = null;
    let variableValues = new Map();
    let error = '';
    newState.inputs.variableValues.value = action.value;
    try {
        if (action.value.length > 0) {
            parsedValue = parser.parse(action.value, {
                structure: state.structure,
                startRule: 'e_tuples',
            });
            console.log('parsed variables value:', parsedValue);
            if (parsedValue.error && parsedValue.error.message)
                error = parsedValue.error.message;
            // [<premenna>, <prvok domeny>]
            for (let i = 0; i < parsedValue.items.length; i++) {
                variableValues.set(parsedValue.items[i][0], parsedValue.items[i][1]);
            }
        }
    } catch (e) {
        console.error(e);
        error = e.message;
    }
    newState.inputs.variableValues.error = error;
    newState.variableValues = variableValues;
    updateExpressionsValue(newState);
    console.log(newState);
    return newState;
}

function setConstantValue(state, action) {
    let newState = copyState(state);
    let constant = newState.inputs.structure.constants[action.constantName];
    constant.value = action.value;
    constant.error = '';
    try {
        newState.structure.setConstantValue(action.constantName, action.value);
    } catch (e) {
        console.error(e);
        constant.error = e.message;
    }
    updateExpressionsValue(newState);
    console.log(newState);
    return newState;
}

function setPredicateValue(state, action) {
    let newState = copyState(state);
    if (action.domainItems) {
        // tabulka mode
        if (action.value) {
            // zaskrtnute
            let old = newState.structure.getPredicateValue(action.predicateName);
            if (old === undefined) {
                old = [];
            }
            old.push(action.domainItems);
            newState.structure.setPredicateValue(action.predicateName, old);
        } else {
            // odskrtnute
            let old = newState.structure.getPredicateValue(action.predicateName);
            let index = old.findIndex((e) => JSON.stringify(e) === JSON.stringify(action.domainItems));
            if (index > -1) {
                // vymazanie
                old.splice(index, 1);
                newState.structure.setPredicateValue(action.predicateName, old);
            }
        }
        newState.inputs.structure.predicates[action.predicateName].value = predicateValueToString(newState.structure.getPredicateValue(action.predicateName));
    } else {
        // text mode
        let iPredicate = newState.inputs.structure.predicates[action.predicateName];
        iPredicate.value = action.value;
        iPredicate.error = '';
        let parsedValue = {error: null, items: []};
        try {
            if (action.value.length > 0) {
                parsedValue = parser.parse(action.value, {
                    structure: newState.structure,
                    startRule: 'tuples',
                    arity: newState.structure.language.getPredicate(action.predicateName)
                });
            }
            newState.structure.setPredicateValue(action.predicateName, parsedValue.items);
            if (parsedValue.error && parsedValue.error.message) {
                iPredicate.error = parsedValue.error.message;
            }
        } catch (e) {
            console.error(e);
            iPredicate.error = e.message;
        }
        newState.inputs.structure.predicates[action.predicateName] = iPredicate;
    }
    updateExpressionsValue(newState);
    console.log(newState);
    return newState;
}

function setFunctionValue(state, action) {
    // TODO dokoncit
    return state;
}

function addExpression(state, action) {
    let expression = defaultExpression();
    if (action.expressionType === 'FORMULA') {
        return {
            ...state,
            expressions: {
                ...state.expressions,
                formulas: [
                    ...state.expressions.formulas,
                    expression
                ]
            }
        }
    }
    if (action.expressionType === 'TERM') {
        return {
            ...state,
            expressions: {
                ...state.expressions,
                terms: [
                    ...state.expressions.terms,
                    expression
                ]
            }
        }
    }
    return state;
}

function deleteExpression(state, action) {
    let newState = copyState(state);
    if (action.expressionType === 'FORMULA') {
        if (newState.expressions.formulas[action.expressionIndex]) {
            newState.expressions.formulas.splice(action.expressionIndex, 1);
        }
    } else if (action.expressionType === 'TERM') {
        if (newState.expressions.terms[action.expressionIndex]) {
            newState.expressions.terms.splice(action.expressionIndex, 1);
        }
    }
    return newState;
}

function updateExpressionsValue(state) {
    for (let i = 0; i < state.expressions.formulas.length; i++) {
        if (state.expressions.formulas[i].parsedObject)
            state.expressions.formulas[i].expressionValue = state.expressions.formulas[i].parsedObject.eval(state.structure, state.variableValues);
    }
    for (let i = 0; i < state.expressions.terms.length; i++) {
        if (state.expressions.terms[i].parsedObject)
            state.expressions.terms[i].expressionValue = state.expressions.terms[i].parsedObject.eval(state.structure, state.variableValues);
    }
}

function checkExpressionSyntax(state, action) {
    let newState = copyState(state);
    let givenExpression = action.value;
    let options = setParserOptions(action.expressionType.toLowerCase(), newState.structure);
    let expressions = [];
    if (action.expressionType === 'FORMULA') {
        givenExpression = '(' + givenExpression + ')';
        expressions = newState.expressions.formulas;
    } else {
        expressions = newState.expressions.terms;
    }
    expressions[action.index].inputValue = action.value;
    try {
        let parsedExpression = null;
        if (givenExpression.length > 0) {
            parsedExpression = parser.parse(givenExpression, options);
        }
        console.log('Parsed expression:', parsedExpression);
        expressions[action.index].feedbackMessage = '';
        expressions[action.index].validSyntax = true;
        expressions[action.index].parsedObject = parsedExpression;
        expressions[action.index].expressionValue = parsedExpression.eval(newState.structure, newState.variableValues);
    } catch (e) {
        console.error(e);
        expressions[action.index].feedbackMessage = e.message;
        expressions[action.index].validSyntax = false;
        expressions[action.index].parsedObject = null;
        expressions[action.index].expressionValue = null;
    }
    console.log(newState);
    return newState;
}

function setExpressionAnswer(state, action) {
    let newState = copyState(state);
    if (action.expressionType === 'FORMULA') {
        let answer = (action.answer === 'true');
        if (action.answer === '-1')
            answer = '-1';
        newState.expressions.formulas[action.expressionIndex].answerValue = answer;
    } else {
        newState.expressions.terms[action.expressionIndex].answerValue = action.answer;
    }
    console.log(newState);
    return newState;
}

function toggleEditTable(state, action) {
    let newState = copyState(state);
    if (action.itemType === 'PREDICATE') {
        if (newState.inputs.structure.predicates[action.name].editMode === 'TEXT')
            newState.inputs.structure.predicates[action.name].editMode = 'TABLE';
        else
            newState.inputs.structure.predicates[action.name].editMode = 'TEXT';
        // if (action.value === 'TEXT')
        //     newState.inputs.structure.predicates[action.name].value = predicateValueToString(newState.structure.getPredicateValue(action.name));
    } else if (action.itemType === 'FUNCTION') {
        if (newState.inputs.structure.functions[action.name].editMode === 'TEXT')
            newState.inputs.structure.functions[action.name].editMode = 'TABLE';
        else
            newState.inputs.structure.functions[action.name].editMode = 'TEXT';
    }
    console.log(newState);
    return newState;
}

const setParserOptions = (startRule, structure) => ({
    startRule: startRule,
    structure: structure,
    conjunction: Conjunction,
    disjunction: Disjunction,
    implication: Implication,
    variable: Variable,
    constant: Constant,
    existentialQuant: ExistentialQuant,
    universalQuant: UniversalQuant,
    functionTerm: FunctionTerm,
    predicate: PredicateAtom,
    negation: Negation,
    equalityAtom: EqualityAtom
});

const defaultExpression = () => ({
    inputValue: '',
    expressionValue: null,
    answerValue: '',
    parsedObject: null,
    feedbackMessage: '',
    inputLocked: false,
    answerLocked: false
});

const copyState = (state) => ({
    structure: state.structure,
    variableValues: state.variableValues,
    inputs: {
        ...state.inputs,
        structure: {
            ...state.inputs.structure,
            constants: {...state.inputs.structure.constants},
            predicates: {...state.inputs.structure.predicates},
            functions: {...state.inputs.structure.functions}
        }
    },
    expressions: {
        ...state.expressions,
        formulas: [...state.expressions.formulas],
        terms: [...state.expressions.terms]
    }
});

export default rootReducer;