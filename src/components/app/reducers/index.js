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
        case 'SET_EDIT_MODE':
            return setEditMode(state, action);
        default:
            return state;
    }
}

function setConstants(state, action) {
    let newState = copyState(state);
    let iConstants = newState.inputs.structure.constants;
    let parsedValue = {error: null, items: []};
    try {
        if (action.value.length > 0) {
            parsedValue = parser.parse(action.value, {startRule: 'constants', structure: newState.structure});
            console.log('parsed constants:', parsedValue);
        }
        newState.structure.setLanguageConstants(parsedValue.items);
        if (parsedValue.error) {
            // chyba sposobena strukturou, napr. obsahuje konstantu
            // ktora uz je v jazyku
            newState.inputs.constants.error = parsedValue.error.message;
            // + parsedValue.pos je pozicia kde je chyba
        } else {
            newState.inputs.constants.error = '';
        }
        iConstants = {};
        for (let i = 0; i < parsedValue.items.length; i++) {
            iConstants[parsedValue.items[i]] = {value: '', error: '', locked: false};
        }

    } catch (e) {
        // syntakticka chyba
        console.error(e);
        newState.inputs.constants.error = e.message;
    }
    newState.inputs.structure.constants = iConstants;

    // sparsovanie vsetkych formul pre opatovnu kontrolu
    // pri zmenenej strukture
    for (let i = 0; i < newState.expressions.formulas.length; i++) {
        try {
            let test = parser.parse('(' + newState.expressions.formulas[i].inputValue + ')', setParserOptions('formula', newState.structure));
            newState.expressions.formulas[i].feedbackMessage = '';
            newState.expressions.formulas[i].validSyntax = true;
            newState.expressions.formulas[i].parsedObject = test;
        } catch (e) {
            console.error(e.message);
            newState.expressions.formulas[i].feedbackMessage = e.message;
            newState.expressions.formulas[i].validSyntax = false;
            newState.expressions.formulas[i].parsedObject = null;
        }
    }

    // sparsovanie vsetkych formul pre opatovnu kontrolu
    // pri zmenenej strukture
    for (let i = 0; i < newState.expressions.terms.length; i++) {
        try {
            let test = parser.parse(newState.expressions.terms[i].inputValue, setParserOptions('term', newState.structure));
            newState.expressions.terms[i].feedbackMessage = '';
            newState.expressions.terms[i].validSyntax = true;
            newState.expressions.terms[i].parsedObject = test;
        } catch (e) {
            console.error(e.message);
            newState.expressions.terms[i].feedbackMessage = e.message;
            newState.expressions.terms[i].validSyntax = false;
            newState.expressions.terms[i].parsedObject = null;
        }
    }

    console.log(newState);
    return newState;
}

function setPredicates(state, action) {
    let newState = copyState(state);
    let iPredicates = newState.inputs.structure.predicates;
    let parsedValue = {error: null, items: []};
    try {
        if (action.value.length > 0) {
            parsedValue = parser.parse(action.value, {startRule: 'predicates', structure: newState.structure});
            console.log('parsed predicates:', parsedValue);
        }
        newState.structure.setLanguagePredicates(parsedValue.items);
        if (parsedValue.error) {
            newState.inputs.predicates.error = parsedValue.error.message;
        } else {
            newState.inputs.predicates.error = '';
        }
        iPredicates = {};
        for (let i = 0; i < parsedValue.items.length; i++) {
            iPredicates[parsedValue.items[i].name] = {value: '', error: '', locked: false, editMode: 'TEXT'};
        }
    } catch (e) {
        console.error(e);
        newState.inputs.predicates.error = e.message;
    }
    newState.inputs.structure.predicates = iPredicates;

    // sparsovanie vsetkych formul pre opatovnu kontrolu
    // pri zmenenej strukture
    for (let i = 0; i < newState.expressions.formulas.length; i++) {
        try {
            let test = parser.parse('(' + newState.expressions.formulas[i].inputValue + ')', setParserOptions('formula', newState.structure));
            newState.expressions.formulas[i].feedbackMessage = '';
            newState.expressions.formulas[i].validSyntax = true;
            newState.expressions.formulas[i].parsedObject = test;
        } catch (e) {
            console.error(e.message);
            newState.expressions.formulas[i].feedbackMessage = e.message;
            newState.expressions.formulas[i].validSyntax = false;
            newState.expressions.formulas[i].parsedObject = null;
        }
    }

    // sparsovanie vsetkych formul pre opatovnu kontrolu
    // pri zmenenej strukture
    for (let i = 0; i < newState.expressions.terms.length; i++) {
        try {
            let test = parser.parse(newState.expressions.terms[i].inputValue, setParserOptions('term', newState.structure));
            newState.expressions.terms[i].feedbackMessage = '';
            newState.expressions.terms[i].validSyntax = true;
            newState.expressions.terms[i].parsedObject = test;
        } catch (e) {
            console.error(e.message);
            newState.expressions.terms[i].feedbackMessage = e.message;
            newState.expressions.terms[i].validSyntax = false;
            newState.expressions.terms[i].parsedObject = null;
        }
    }

    console.log(newState);
    return newState;
}

function setFunctions(state, action) {
    let newState = copyState(state);
    let iFunctions = newState.inputs.structure.functions;
    let parsedValue = {error: null, items: []};
    try {
        if (action.value.length > 0) {
            parsedValue = parser.parse(action.value, {startRule: 'functions', structure: newState.structure});
            console.log('parsed functions:', parsedValue);
        }
        newState.structure.setLanguageFunctions(parsedValue.items);
        if (parsedValue.error) {
            newState.inputs.functions.error = parsedValue.error.message;
        } else {
            newState.inputs.functions.error = '';
        }
        iFunctions = {};
        for (let i = 0; i < parsedValue.items.length; i++) {
            iFunctions[parsedValue.items[i].name] = {value: '', error: '', locked: false};
        }
    } catch (e) {
        console.error(e);
        newState.inputs.functions.error = e.message;
    }
    newState.inputs.structure.functions = iFunctions;

    // sparsovanie vsetkych formul pre opatovnu kontrolu
    // pri zmenenej strukture
    for (let i = 0; i < newState.expressions.formulas.length; i++) {
        try {
            let test = parser.parse('(' + newState.expressions.formulas[i].inputValue + ')', setParserOptions('formula', newState.structure));
            newState.expressions.formulas[i].feedbackMessage = '';
            newState.expressions.formulas[i].validSyntax = true;
            newState.expressions.formulas[i].parsedObject = test;
        } catch (e) {
            console.error(e.message);
            newState.expressions.formulas[i].feedbackMessage = e.message;
            newState.expressions.formulas[i].validSyntax = false;
            newState.expressions.formulas[i].parsedObject = null;
        }
    }

    // sparsovanie vsetkych formul pre opatovnu kontrolu
    // pri zmenenej strukture
    for (let i = 0; i < newState.expressions.terms.length; i++) {
        try {
            let test = parser.parse(newState.expressions.terms[i].inputValue, setParserOptions('term', newState.structure));
            newState.expressions.terms[i].feedbackMessage = '';
            newState.expressions.terms[i].validSyntax = true;
            newState.expressions.terms[i].parsedObject = test;
        } catch (e) {
            console.error(e.message);
            newState.expressions.terms[i].feedbackMessage = e.message;
            newState.expressions.terms[i].validSyntax = false;
            newState.expressions.terms[i].parsedObject = null;
        }
    }

    console.log(newState);
    return newState;
}

function setDomain(state, action) {
    let newState = copyState(state);
    let structure = newState.structure;
    newState.inputs.structure.domain.value = action.value;
    let parsedValue = null;
    try {
        if (action.value.length === 0)
            throw new InvalidLanguageException('Doména nesmie byť prázdna');

        parsedValue = parser.parse(action.value, {startRule: 'domain'});
        console.log('parsed domain:', parsedValue);
        let newDomain = new Set(parsedValue.items);
        structure.setDomain(newDomain);
        newState.inputs.structure.domain.error = '';
    } catch (e) {
        console.error(e);
        newState.inputs.structure.domain.error = e.message;
    }

    // let newPredicates = checkPredicatesValues(structure.domain, structure.iPredicate);
    // structure.iPredicate = newPredicates[0];
    // for (let name in newPredicates[1]) {
    //     if (!newPredicates[1].hasOwnProperty(name)) continue;
    //     newState.inputs.structure.predicates[name].error = newPredicates[1][name];
    // }

    // TODO VYKONAT PO TOMTO:
    // 1) skontrolovanie syntaxe a semantiky vsetkych vyrazov
    // 2) skontrolovanie hodnot predikatov
    // 3) skontrolovanie honost funkcii
    // 4) skontrolovanie hodnot konstant

    let iPredicate = newState.inputs.structure.predicates;


    console.log(newState);
    return newState;
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
            if (parsedValue.error)
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
    console.log(newState);
    return newState;
}

function checkPredicatesValues(domain, predicates) {
    let p = new Map();
    let add = false;
    let errors = {};
    predicates.forEach((value, name) => {
        let newVal = [];
        for (let i = 0; i < value.length; i++) {
            add = true;
            for (let j = 0; j < value[i].length; j++) {
                if (!domain.has(value[i][j])) {
                    add = false
                    errors[name] = 'Domnena neobsahuje prvok ' + value[i][j];
                }
            }
            if (add) {
                newVal.push(value[i]);
            }
        }
        p.set(name, newVal);
    });
    return [p, errors];
}

function setConstantValue(state, action) {
    let newState = copyState(state);
    let structure = newState.structure;
    let constant = newState.inputs.structure.constants[action.constantName];
    try {
        structure.setConstantValue(action.constantName, action.value);
        constant.value = action.value;
        constant.error = '';
    } catch (e) {
        console.error(e);
        constant.error = e.message;
    }

    newState.inputs.structure.constants[action.constantName] = constant;

    // KONTROLA SEMANTIKY VYRAZOV

    console.log(newState);
    return newState;
}

function setPredicateValue(state, action) {
    let newState = copyState(state);
    let structure = newState.structure;
    if (action.domainItems) {
        // tabulka mode
        if (action.value) {
            // zaskrtnute
            let old = structure.iPredicate.get(action.predicateName);
            if (old === undefined) {
                old = [];
            }
            old.push(action.domainItems);
            structure.iPredicate.set(action.predicateName, old);
        } else {
            // odskrtnute
            let old = structure.iPredicate.get(action.predicateName);
            let index = old.findIndex((e) => JSON.stringify(e) === JSON.stringify(action.domainItems));
            console.log(index);
            if (index > -1) {
                old.splice(index, 1);
            }
            structure.iPredicate.set(action.predicateName, old);
        }
    } else {
        // text mode
        let iPredicate = newState.inputs.structure.predicates[action.predicateName];
        iPredicate.value = action.value;
        let parsedValue = null;
        try {
            parsedValue = parser.parse(action.value, {
                structure: structure,
                startRule: 'tuples',
                arity: structure.language.getPredicate(action.predicateName)
            });
            structure.setPredicateValue(action.predicateName, parsedValue.items);
            if (parsedValue.error) {
                iPredicate.error = parsedValue.error.message;
            } else {
                iPredicate.error = '';
            }
        } catch (e) {
            console.error(e);
            iPredicate.error = e.message;
        }
        newState.inputs.structure.predicates[action.predicateName] = iPredicate;
    }

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

function checkExpressionSyntax(state, action) {
    let givenExpression = action.value;
    let options = setParserOptions(action.expressionType.toLowerCase(), state.structure);

    let expressions = [];
    let newExpressions = {};

    if (action.expressionType === 'FORMULA') {
        givenExpression = '(' + givenExpression + ')';
        expressions = state.expressions.formulas.map((item, index) => {
            return item;
        });
    } else {
        expressions = state.expressions.terms.map((item, index) => {
            return item;
        });
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
    } catch (e) {
        console.error(e);
        expressions[action.index].feedbackMessage = e.message;
        expressions[action.index].validSyntax = false;
        expressions[action.index].parsedObject = null;
    }

    if (action.expressionType === 'FORMULA') {
        newExpressions = {formulas: expressions, terms: [...state.expressions.terms]}
    } else {
        newExpressions = {formulas: [...state.expressions.formulas], terms: expressions}
    }

    let s = {
        ...state,
        inputs: {...state.inputs},
        expressions: newExpressions
    };

    console.log(s);
    return s;
}

function setExpressionAnswer(state, action) {
    let newState = {
        structure: state.structure,
        inputs: {...state.inputs},
        expressions: {
            ...state.expressions,
            formulas: [...state.expressions.formulas],
            terms: [...state.expressions.terms]
        }
    };

    let expressionValue = null;

    if (action.expressionType === 'FORMULA') {
        let expression = newState.expressions.formulas[action.expressionIndex];

        if (expression.parsedObject) {
            expressionValue = newState.expressions.formulas[action.expressionIndex].parsedObject.eval(newState.structure, new Map());
            let givenAnswer = (action.answer === "true");
            expression.answerValue = givenAnswer;
            expression.expressionValue = expressionValue;
        }

    } else {
        newState.expressions.terms[action.expressionIndex].answerValue = action.answer;
    }


    console.log('new state:', newState);
    return newState;
}

function setEditMode(state, action) {
    let newState = copyState(state);
    if (action.itemType === 'PREDICATE') {
        newState.inputs.structure.predicates[action.name].editMode = action.value;
    } else if (action.itemType === 'FUNCTION') {
        newState.inputs.structure.functions[action.name].editMode = action.value;
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