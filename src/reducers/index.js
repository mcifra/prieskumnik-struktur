import Language from '../model/Language';
import Structure from '../model/Structure';
import Variable from "../model/term/Term.Variable";
import ExistentialQuant from "../model/formula/Formula.ExistentialQuant";
import Disjunction from "../model/formula/Formula.Disjunction";
import EqualityAtom from "../model/formula/Formula.EqualityAtom";
import PredicateAtom from "../model/formula/Formula.PredicateAtom";
import Conjunction from "../model/formula/Formula.Conjunction";
import Constant from "../model/term/Term.Constant";
import UniversalQuant from "../model/formula/Formula.UniversalQuant";
import Negation from "../model/formula/Formula.Negation";
import FunctionTerm from "../model/term/Term.FunctionTerm";
import Implication from "../model/formula/Formula.Implication";

let parser = require('../parser/grammar');

let s = {
    structure: new Structure(new Language()),
    variableValues: new Map(),
    inputs: {
        constants: {value: '', feedback: {type: null, message: ''}, locked: false, parsed: []},
        predicates: {value: '', feedback: {type: null, message: ''}, locked: false, parsed: []},
        functions: {value: '', feedback: {type: null, message: ''}, locked: false, parsed: []},
        variableValues: {value: '', feedback: {type: null, message: ''}, locked: false, parsed: []},
        structure: {
            domain: {value: '', feedback: {type: 'error', message: 'Doména nesmie byť prázdna'}, locked: false},
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

function rootReducer(state = s, action) {
    s = copyState(state);
    switch (action.type) {
        case 'EXPORT_APP':
            return exportAppState();
        case 'IMPORT_APP':
            importAppState(action.content);
            return s;
        case 'SET_CONSTANTS':
            parseText(action.value, s.inputs.constants, {startRule: 'constants'});
            if (s.inputs.constants.parsed) {
                syncLanguageSymbols(setConstants(), setPredicates(), setFunctions());
                syncLanguageInterpretation();
                setVariables();
            }
            return s;
        case 'SET_PREDICATES':
            parseText(action.value, s.inputs.predicates, {startRule: 'predicates'});
            if (s.inputs.predicates.parsed) {
                syncLanguageSymbols(setPredicates(), setConstants(), setFunctions());
                syncLanguageInterpretation();
                setVariables();
            }
            return s;
        case 'SET_FUNCTIONS':
            parseText(action.value, s.inputs.functions, {startRule: 'functions'});
            if (s.inputs.functions.parsed) {
                syncLanguageSymbols(setFunctions(), setPredicates(), setConstants());
                syncLanguageInterpretation();
                setVariables();
            }
            return s;
        case 'SET_DOMAIN':
            if (action.value.length === 0) {
                s.inputs.structure.domain.value = '';
                s.inputs.structure.domain.parsed = [];
                s.inputs.structure.domain.feedback.message = 'Doména nesmie byť prázdna';
                s.inputs.structure.domain.feedback.type = 'error';
            } else {
                parseText(action.value, s.inputs.structure.domain, {startRule: 'domain'});
            }
            setDomain();
            syncConstantsValues();
            syncPredicatesValues();
            setVariables();
            return s;
        case 'SET_VARIABLES_VALUE':
            parseText(action.value, s.inputs.variableValues, {structure: s.structure, startRule: 'e_tuples',});
            setVariables();
            return s;
        case 'SET_CONSTANT_VALUE':
            return setConstantValue(s, action);
        case 'SET_PREDICATE_VALUE_TEXT':
            parseText(action.value, s.inputs.structure.predicates[action.predicateName], {
                structure: s.structure,
                startRule: 'tuples',
                arity: s.structure.language.getPredicate(action.predicateName.split('/')[0])
            });
            setPredicateValue(action.predicateName);
            return s;
        case 'SET_PREDICATE_VALUE_TABLE':
            if (action.checked)
                addPredicateValue(action.predicateName, action.value);
            else
                removePredicateValue(action.predicateName, action.value);
            let predicateValue = s.structure.getPredicateValue(action.predicateName);
            s.inputs.structure.predicates[action.predicateName].parsed = predicateValue;
            s.inputs.structure.predicates[action.predicateName].value = predicateValueToString(predicateValue);
            return s;
        case 'SET_FUNCTION_VALUE_TEXT':
            let text = action.value;
            let arity = parseInt(s.structure.language.getFunction(action.functionName.split('/')[0])) + 1;
            parseText(text, s.inputs.structure.functions[action.functionName], {
                structure: s.structure,
                startRule: 'tuples',
                arity: arity
            });
            setFunctionValue(action.functionName);
            return s;
        case 'SET_FUNCTION_VALUE_TABLE':
            let tuple = action.value;
            addFunctionValue(action.functionName, tuple);
            return s;
        case 'TOGGLE_EDIT_TABLE':
            toggleEditTable(action);
            return s;
        case 'ADD_FORMULA':
            addFormula();
            return s;
        case 'ADD_TERM':
            addTerm();
            return s;
        case 'REMOVE_FORMULA':
            removeFormula(action.index);
            return s;
        case 'REMOVE_TERM':
            removeTerm(action.index);
            return s;
        case 'CHECK_SYNTAX':
            checkExpressionSyntax(action);
            return s;
        case 'SET_FORMULA_ANSWER':
            setFormulaAnswer(action.answer, action.index);
            return s;
        case 'SET_TERM_ANSWER':
            setTermAnswer(action.answer, action.index);
            return s;
        default:
            return s;
    }
}

// synchronizuje cely jazyk s interpretaciou
function syncLanguageInterpretation() {
    syncConstantsInterpretation();
    syncPredicatesInterpretation();
    syncFunctionsInterpretation();
}

// nastavi konstanty, predikaty a funkcie do jazyka v pozadovanom poradi
function syncLanguageSymbols(f1, f2, f3) {
    f1;
    f2;
    f3
}

function setConstants() {
    if (!s.inputs.constants.parsed)
        return;
    s.inputs.constants.feedback.message = s.structure.setLanguageConstants(s.inputs.constants.parsed);
}

function setPredicates() {
    if (!s.inputs.predicates.parsed)
        return;
    s.inputs.predicates.feedback.message = s.structure.setLanguagePredicates(s.inputs.predicates.parsed);
}

function setFunctions() {
    if (!s.inputs.functions.parsed)
        return;
    s.inputs.functions.feedback.message = s.structure.setLanguageFunctions(s.inputs.functions.parsed);
}

function setDomain() {
    if (!s.inputs.structure.domain.parsed)
        return;
    s.inputs.structure.domain.feedback.message = s.structure.setDomain(s.inputs.structure.domain.parsed);
}

// synchronizuje konstanty v jazyku s interpretaciou
function syncConstantsInterpretation() {
    let constants = s.structure.language.constants;
    let unusedConstants = [...s.structure.iConstant.keys()].filter(e => !s.structure.language.hasConstant(e));
    unusedConstants.forEach(constant => {
        s.structure.iConstant.delete(constant);
        delete s.inputs.structure.constants[constant];
    });
    constants.forEach(constant => {
        if (!s.inputs.structure.constants[constant])
            s.inputs.structure.constants[constant] = {
                value: '',
                feedback: {type: 'error', message: 'Interpretačná hodnota konštanty nesmie byť prázdna'},
                locked: false
            };
    });
}

// po zmene domeny sa aktualizuju hodnoty konstant
function syncConstantsValues() {
    let it = s.structure.iConstant.keys();
    let k = null;
    while (k = it.next().value) {
        if (!s.structure.hasDomainItem(s.structure.getConstantValue(k))) {
            s.structure.iConstant.delete(k);
            s.inputs.structure.constants[k].feedback.message = 'Interpretačná hodnota konštanty nesmie byť prázdna';
            s.inputs.structure.constants[k].feedback.type = 'error';
            s.inputs.structure.constants[k].value = '';
        }
    }
}

function setConstantValue(state, action) {
    let newState = copyState(state);
    newState.inputs.structure.constants[action.constantName].value = action.value;
    newState.inputs.structure.constants[action.constantName].feedback.message = '';
    try {
        newState.structure.setConstantValue(action.constantName, action.value);
    } catch (e) {
        console.error(e);
        newState.inputs.structure.constants[action.constantName].feedback.message = e.message;
        newState.inputs.structure.constants[action.constantName].feedback.type = 'error';
    }
    return newState;
}

// synchronizuje predikaty v jazyku s interpretaciou
// zmaze hodnoty vymazanych predikatov
// aktualizuje vstupy
function syncPredicatesInterpretation() {
    let predicates = s.structure.language.predicates;
    let unusedPredicates = [...s.structure.iPredicate.keys()].filter(e => !s.structure.language.hasPredicate(e)); // predikaty ktore nie su v jazyku
    unusedPredicates.forEach(predicate => { // zmazanie vstupu a hodnoty
        s.structure.iPredicate.delete(predicate);
        delete s.inputs.structure.predicates[predicate];
    });
    predicates.forEach((arity, predicate) => {
        if (!s.inputs.structure.predicates[predicate + '/' + arity])
            s.inputs.structure.predicates[predicate + '/' + arity] = {
                value: '',
                feedback: {type: null, message: ''},
                locked: false,
                editMode: 'TEXT'
            }
    })
}

// po zmene domeny sa aktualizuju hodnoty predikatov
function syncPredicatesValues() {
    let predicates = Object.keys(s.inputs.structure.predicates);
    predicates.forEach(predicate => {
        setPredicateValue(predicate);
    })
}

// zoberie hodnotu z .parsed a
// vlozi to do struktury
function setPredicateValue(predicateName) {
    if (!s.inputs.structure.predicates[predicateName] || !s.inputs.structure.predicates[predicateName].parsed)
        return;
    s.structure.setPredicateValue(predicateName, []); // vyprazdnenie hodnoty
    s.inputs.structure.predicates[predicateName].feedback.message = '';
    s.inputs.structure.predicates[predicateName].feedback.type = null;
    s.inputs.structure.predicates[predicateName].parsed.forEach(tuple => {
        addPredicateValue(predicateName, tuple);
    });
}

// prida n-ticu do hodnoty predikatu
// do struktury
// kontroluje aritu a ci su prvky v domene
function addPredicateValue(predicateName, tuple) {
    let p = predicateName.split('/')[0];
    let arity = s.structure.language.getPredicate(p);
    if (arity != tuple.length) {
        s.inputs.structure.predicates[predicateName].feedback.message = 'N-tica ' + tuple + ' nemá povolený počet prvkov';
        s.inputs.structure.predicates[predicateName].feedback.type = 'error';
        removePredicateValue(predicateName, tuple);
        return;
    }
    let illegalItems = tuple.filter(item => !s.structure.hasDomainItem(item)); // prvky ktore nie su v domene
    if (illegalItems.length > 0) {
        s.inputs.structure.predicates[predicateName].feedback.message = 'Prvok ' + illegalItems[0] + ' nie je v doméne štruktúry';
        s.inputs.structure.predicates[predicateName].feedback.type = 'error';
        removePredicateValue(predicateName, tuple);
        return;
    }
    if (!s.structure.iPredicate.has(predicateName)) {
        s.structure.iPredicate.set(predicateName, []);
    }
    if (s.structure.iPredicate.get(predicateName).findIndex(e => JSON.stringify(e) === JSON.stringify(tuple)) === -1) {
        // prida iba ked tam este nie je
        s.structure.iPredicate.get(predicateName).push(tuple);
    }
}

// pokusi sa zmazat n-ticu z hodnoty predikatu
// zo struktury
// iba ked existuje
function removePredicateValue(predicateName, tuple) {
    if (!s.structure.getPredicateValue(predicateName))
        return;
    let index = s.structure.getPredicateValue(predicateName).findIndex(e => JSON.stringify(e) === JSON.stringify(tuple));
    if (index > -1)
        s.structure.getPredicateValue(predicateName).splice(index, 1);
}

// synchronizuje funkcie v jazyku s interpretaciou
// zmaze hodnoty vymazanych funkcii
// aktualizuje vstupy
function syncFunctionsInterpretation() {
    let functions = s.structure.language.functions;
    let unusedFunctions = [...s.structure.iFunction.keys()].filter(e => !s.structure.language.hasFunction(e));
    unusedFunctions.forEach(f => {
        s.structure.iFunction.delete(f);
        delete s.inputs.structure.functions[f];
    });
    functions.forEach((arity, f) => {
        if (!s.inputs.structure.functions[f + '/' + arity])
            s.inputs.structure.functions[f + '/' + arity] = {
                value: '',
                feedback: {type: null, message: ''},
                locked: false,
                editMode: 'TEXT'
            }
    })
}

// po zmene domeny sa aktualizuju hodnoty funkcii
function syncFunctionsValues() {
    let functions = Object.keys(s.inputs.structure.functions);
    functions.forEach(f => {
        setFunctionValue(f);
    })
}

// zoberie hodnotu z .parsed a
// vlozi to do struktury
function setFunctionValue(functionName) {
    if (!s.inputs.structure.functions[functionName] || !s.inputs.structure.functions[functionName].parsed)
        return;
    s.inputs.structure.functions[functionName].parsed.forEach(tuple => {
        addFunctionValue(functionName, tuple);
    });
}

// prida n-ticu do hodnoty funkcie
// do struktury
// kontroluje aritu a ci su prvky v domene
function addFunctionValue(functionName, tuple) {
    let p = functionName.split('/')[0];
    let arity = s.structure.language.getFunction(p);
    if (arity != tuple.length) {
        s.inputs.structure.functions[functionName].feedback.message = 'N-tica ' + tuple + ' nemá povolený počet prvkov';
        s.inputs.structure.functions[functionName].feedback.type = 'error';
        removeFunctionValue(functionName, tuple);
        return;
    }
    let params = tuple.slice(0, tuple.length - 1);
    let value = tuple[tuple.length - 1];
    if (!value) {
        // vyuzitie pri tabulke
        removeFunctionValue(functionName, params);
        return;
    }
    let illegalItems = tuple.filter(item => !s.structure.hasDomainItem(item)); // prvky ktore nie su v domene
    if (illegalItems.length > 0) {
        s.inputs.structure.functions[functionName].feedback.message = 'Prvok ' + illegalItems[0] + ' nie je v doméne štruktúry';
        s.inputs.structure.functions[functionName].feedback.type = 'error';
        removeFunctionValue(functionName, tuple);
        return;
    }
    if (!s.structure.iFunction.has(functionName)) {
        s.structure.iFunction.set(functionName, new Map());
    }
    let m = s.structure.iFunction.get(functionName);
    m.set(JSON.stringify(params), value);
}

// pokusi sa zmazat n-ticu z hodnoty funkcie
// zo struktury
// iba ked existuje
function removeFunctionValue(functionName, params) {
    let m = s.structure.iFunction.get(functionName);
    if (m)
        m.delete(JSON.stringify(params));
}

// zoberie hodnotu z .parsed,
// vycisti stare hodnoty a da tam nove
function setVariables() {
    if (!s.inputs.variableValues.parsed)
        return; // zle sparsovane
    s.variableValues.clear();
    let feedback = {type: null, message: ''};
    s.inputs.variableValues.parsed.forEach(tuple => {
        let variable = tuple[0];
        let value = tuple[1];
        if (s.structure.language.hasItem(variable)) {
            feedback.message = 'Jazyk už obsahuje prvok ' + variable;
            feedback.type = 'error';
        }
        else if (!s.structure.hasDomainItem(value)) {
            feedback.message = 'Doména štruktúry neobsahuje prvok ' + value;
            feedback.type = 'error';
        }
        else s.variableValues.set(variable, value);
    });
    s.inputs.variableValues.feedback = feedback;
}

// zparsuje text z inputu
// a vysledok vlozi do textData ako .parsed
// + prida aj chybovu hlasku
function parseText(text, textData, parserOptions) {
    textData.value = text;
    textData.feedback = {type: null, message: ''};
    if (text.length === 0) {
        textData.parsed = [];
        return;
    }
    try {
        let parsedValue = parser.parse(text, parserOptions);
        if (parsedValue.items)
            textData.parsed = parsedValue.items;
        else
            textData.parsed = parsedValue;
    } catch (e) {
        console.error(e);
        textData.feedback.type = 'error';
        textData.feedback.message = e.message;
        textData.parsed = null;
    }
}

// function syncFunctionValue(domain, value) {
//     let keys = [...value.keys()];
//     for (let i = 0; i < keys.length; i++) {
//         let keysTemp = JSON.parse(keys[i]);
//         for (let j = 0; j < keysTemp.length; j++) {
//             if (!domain.has(keysTemp[j])) {
//                 value.delete(keys[i]);
//                 break;
//             }
//         }
//         if (!domain.has(value.get(keys[i]))) {
//             value.delete(keys[i]);
//         }
//     }
// }

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

// prerobi hodnotu predikatu (pole poli) na string
// v tvare "(...), (...), ..."
function predicateValueToString(value) {
    if (value === undefined || value.length === 0)
        return '';
    let res = '';
    for (let i = 0; i < value.length; i++) {
        res += tupleToString(value[i]);
        if (i < value.length - 1)
            res += ', ';
    }
    return res;
}

// prerobi hodnotu funkcie (struktura Map) na string
// v tvare "(...), (...), ..."
function functionValueToString(value) {
    // value je Map()
    let res = '';
    value.forEach((val, key) => {
        let tuple = JSON.parse(key);
        tuple.push(val);
        let temp = tupleToString(tuple);
        res += temp + ', ';
    });
    if (res.substring(res.length - 2, res.length) === ', ')
        res = res.substring(0, res.length - 2);
    return res;
}

// prida sa formula do zoznamu formul
function addFormula() {
    s.expressions.formulas.push(defaultExpression);
}

// zmaze sa formula zo zoznamu formul
function removeFormula(index) {
    if (s.expressions.formulas[index]) {
        s.expressions.formulas.splice(index, 1);
    }
}

// prida sa term do zoznamu termov
function addTerm() {
    s.expressions.terms.push(defaultExpression);
}

// zmaze sa term zo zoznamu termov
function removeTerm(index) {
    if (s.expressions.terms[index]) {
        s.expressions.terms.splice(index, 1);
    }
}

// po zmene domeny sa zobberie hodnota z .parsed
// a znova sa vyraz vyhodnoti, neparsuje sa znova
function syncExpressionsValue() {
    s.expressions.formulas.forEach(formula => {
        if (formula.parsedObject) {
            formula.expressionValue = formula.parsedObject.eval(s.structure, s.variableValues);
        }
    });
    s.expressions.terms.forEach(term => {
        if (term.parsedObject) {
            term.expressionValue = term.parsedObject.eval(s.structure, s.variableValues);
        }
    });
}

// po zmene hodnoty inputu
function checkExpressionSyntax(action) {
    let expressionText = action.value;
    let expression = s.expressions.terms[action.index];
    if (action.expressionType === 'FORMULA') {
        expressionText = '(' + expressionText + ')';
        expression = s.expressions.formulas[action.index];
    }
    parseText(expressionText, expression, setParserOptions(action.expressionType.toLowerCase()));
    expression.value = action.value; // aby tam neboli zatvorky
    if (expression.feedback.message.length === 0) {
        expression.validSyntax = true;
        expression.expressionValue = expression.parsed.eval(s.structure, s.variableValues);
    } else {
        expression.validSyntax = false;
    }
}

// zmena odpovede pri formule
function setFormulaAnswer(answer, index) {
    let ans = (answer === 'true');
    if (answer === '-1')
        ans = '-1';
    s.expressions.formulas[index].answerValue = ans;
}

// zmena odpovede pri terme
function setTermAnswer(answer, index) {
    s.expressions.terms[index].answerValue = answer;
}

function toggleEditTable(action) {
    if (action.itemType === 'PREDICATE') {
        if (s.inputs.structure.predicates[action.name].editMode === 'TEXT')
            s.inputs.structure.predicates[action.name].editMode = 'TABLE';
        else
            s.inputs.structure.predicates[action.name].editMode = 'TEXT';
    } else if (action.itemType === 'FUNCTION') {
        if (s.inputs.structure.functions[action.name].editMode === 'TEXT')
            s.inputs.structure.functions[action.name].editMode = 'TABLE';
        else
            s.inputs.structure.functions[action.name].editMode = 'TEXT';
    }
}

function exportAppState() {
    let x = JSON.stringify({inputs: s.inputs, expressions: s.expressions});
    console.log(x);
    return s;
}

function importAppState(content) {
    try {
        s = JSON.parse(content);
        s.structure = new Structure(new Language());
        setDomain();
        setConstants();
        setPredicates();
        setFunctions();
        // setConstantsValues();
        syncPredicatesValues();
        syncFunctionsValues();
    } catch (e) {
        console.error(e);
    }
}

const setParserOptions = (startRule) => ({
    startRule: startRule,
    structure: s.structure,
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

const defaultExpression = {
    value: '',
    expressionValue: null,
    answerValue: '',
    feedback: {type: null, message: ''},
    inputLocked: false,
    answerLocked: false
};

const copyState = (s) => ({
    structure: s.structure,
    variableValues: s.variableValues,
    inputs: {
        ...s.inputs,
        structure: {
            ...s.inputs.structure,
            variableValues: {...s.inputs.variableValues, feedback: {...s.inputs.variableValues.feedback}},
            constants: {...s.inputs.structure.constants},
            predicates: {...s.inputs.structure.predicates},
            functions: {...s.inputs.structure.functions}
        }
    },
    expressions: {
        ...s.expressions,
        formulas: [...s.expressions.formulas],
        terms: [...s.expressions.terms]
    }
});

export default rootReducer;