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
                setConstants();
                setPredicates();
                setFunctions();
                setVariables();
            }
            return s;
        case 'SET_PREDICATES':
            parseText(action.value, s.inputs.predicates, {startRule: 'predicates'});
            if (s.inputs.predicates.parsed) {
                setPredicates();
                setConstants();
                setFunctions();
                setVariables();
            }
            return s;
        case 'SET_FUNCTIONS':
            parseText(action.value, s.inputs.functions, {startRule: 'functions'});
            if (s.inputs.functions.parsed) {
                setFunctions();
                setPredicates();
                setConstants();
                setVariables();
            }
            return s;
        case 'SET_DOMAIN':
            parseText(action.value, s.inputs.structure.domain, {startRule: 'domain'});
            setDomain();
            setConstantsValues();
            setPredicatesValues();
            setFunctionsValues();
            setVariables();
            syncExpressionsValue();
            return s;
        case 'SET_VARIABLES_VALUE':
            parseText(action.value, s.inputs.variableValues, {structure: s.structure, startRule: 'e_tuples',});
            setVariables();
            syncExpressionsValue();
            return s;
        case 'SET_CONSTANT_VALUE':
            setConstantValue(action.constantName, action.value);
            syncExpressionsValue();
            return s;
        case 'SET_PREDICATE_VALUE_TEXT':
            parseText(action.value, s.inputs.structure.predicates[action.predicateName], {startRule: 'tuples'});
            setPredicateValue(action.predicateName);
            syncExpressionsValue();
            return s;
        case 'SET_PREDICATE_VALUE_TABLE':
            if (action.checked)
                addPredicateValue(action.predicateName, action.value);
            else
                removePredicateValue(action.predicateName, action.value);
            let predicateValue = s.structure.getPredicateValue(action.predicateName);
            s.inputs.structure.predicates[action.predicateName].parsed = predicateValue;
            s.inputs.structure.predicates[action.predicateName].value = predicateValueToString(predicateValue);
            syncExpressionsValue();
            return s;
        case 'SET_FUNCTION_VALUE_TEXT':
            parseText(action.value, s.inputs.structure.functions[action.functionName], {startRule: 'tuples'});
            setFunctionValue(action.functionName);
            syncExpressionsValue();
            return s;
        case 'SET_FUNCTION_VALUE_TABLE':
            let tuple = action.value;
            addFunctionValue(action.functionName, tuple);
            let functionValue = s.structure.getFunctionValueArray(action.functionName);
            s.inputs.structure.functions[action.functionName].parsed = functionValue;
            s.inputs.structure.functions[action.functionName].value = predicateValueToString(functionValue);
            syncExpressionsValue();
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

function setConstants() {
    if (!s.inputs.constants.parsed)
        return;
    s.inputs.constants.feedback.message = s.structure.setLanguageConstants(s.inputs.constants.parsed);
    let inputs = Object.keys(s.inputs.structure.constants);
    inputs.forEach(c => {
        if (!s.structure.language.hasConstant(c)) {
            delete s.inputs.structure.constants[c];
        }
    });
    s.structure.language.getConstants().forEach(constant => {
        if (!s.inputs.structure.constants[constant])
            s.inputs.structure.constants[constant] = {
                value: '',
                feedback: {type: 'error', message: 'Interpretačná hodnota konštanty nesmie byť prázdna'},
                locked: false
            };
    });
}

function setPredicates() {
    if (!s.inputs.predicates.parsed)
        return;
    s.inputs.predicates.feedback.message = s.structure.setLanguagePredicates(s.inputs.predicates.parsed);
    let inputs = Object.keys(s.inputs.structure.predicates);
    inputs.forEach(p => { // zmazanie vstupu
        if (!s.structure.language.hasPredicate(p)) {
            delete s.inputs.structure.predicates[p];
        }
    });
    s.structure.language.predicates.forEach((arity, predicate) => {
        if (!s.inputs.structure.predicates[predicate + '/' + arity])
            s.inputs.structure.predicates[predicate + '/' + arity] = {
                value: '',
                feedback: {type: null, message: ''},
                locked: false,
                editMode: 'TEXT'
            }
    })
}

function setFunctions() {
    if (!s.inputs.functions.parsed)
        return;
    s.inputs.functions.feedback.message = s.structure.setLanguageFunctions(s.inputs.functions.parsed);
    let inputs = Object.keys(s.inputs.structure.functions);
    inputs.forEach(f => {
        if (!s.structure.language.hasFunction(f)) {
            delete s.inputs.structure.functions[f];
        }
    });
    s.structure.language.functions.forEach((arity, f) => {
        if (!s.inputs.structure.functions[f + '/' + arity])
            s.inputs.structure.functions[f + '/' + arity] = {
                value: '',
                feedback: {type: null, message: ''},
                locked: false,
                editMode: 'TEXT'
            }
    })
}

function setDomain() {
    if (!s.inputs.structure.domain.parsed)
        return;
    let message = '';
    if (s.inputs.structure.domain.parsed.length === 0) {
        message = 'Doména nesmie byť prázdna';
        s.inputs.structure.domain.feedback.type = 'error';
    }
    s.structure.setDomain(s.inputs.structure.domain.parsed);
    s.inputs.structure.domain.feedback.message = message;
}

// po zmene domeny sa aktualizuju hodnoty konstant
function setConstantsValues() {
    let it = s.structure.iConstant.keys();
    let k;
    while (k = it.next().value) {
        if (!s.structure.hasDomainItem(s.structure.getConstantValue(k))) {
            s.structure.iConstant.delete(k);
            s.inputs.structure.constants[k].feedback.message = 'Interpretačná hodnota konštanty nesmie byť prázdna';
            s.inputs.structure.constants[k].feedback.type = 'error';
            s.inputs.structure.constants[k].value = '';
        }
    }
}

function setConstantValue(constantName, value) {
    s.inputs.structure.constants[constantName].value = value;
    s.inputs.structure.constants[constantName].feedback.message = '';
    try {
        s.structure.setConstantValue(constantName, value);
    } catch (e) {
        console.error(e);
        s.inputs.structure.constants[constantName].feedback.message = e.message;
        s.inputs.structure.constants[constantName].feedback.type = 'error';
    }
}

// po zmene domeny sa aktualizuju hodnoty predikatov
function setPredicatesValues() {
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
    s.structure.clearPredicateValue(predicateName);
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
    if (s.structure.language.getPredicate(p) !== tuple.length) {
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

// po zmene domeny sa aktualizuju hodnoty funkcii
function setFunctionsValues() {
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
    s.structure.clearFunctionValue(functionName);
    s.inputs.structure.functions[functionName].feedback.message = '';
    s.inputs.structure.functions[functionName].feedback.type = null;
    s.inputs.structure.functions[functionName].parsed.forEach(tuple => {
        addFunctionValue(functionName, tuple);
    });
}

// prida n-ticu do hodnoty funkcie
// do struktury
// kontroluje aritu a ci su prvky v domene
function addFunctionValue(functionName, tuple) {
    let p = functionName.split('/')[0];
    if (tuple.length !== s.structure.language.getFunction(p) + 1) {
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

// prida sa formula do zoznamu formul
function addFormula() {
    s.expressions.formulas.push(defaultExpression());
}

// zmaze sa formula zo zoznamu formul
function removeFormula(index) {
    if (s.expressions.formulas[index]) {
        s.expressions.formulas.splice(index, 1);
    }
}

// prida sa term do zoznamu termov
function addTerm() {
    s.expressions.terms.push(defaultExpression());
}

// zmaze sa term zo zoznamu termov
function removeTerm(index) {
    if (s.expressions.terms[index]) {
        s.expressions.terms.splice(index, 1);
    }
}

// po zmene domeny sa zoberie hodnota z .parsed
// a znova sa vyraz vyhodnoti, neparsuje sa znova
function syncExpressionsValue() {
    s.expressions.formulas.forEach(formula => {
        evalExpression(formula);
    });
    s.expressions.terms.forEach(term => {
        evalExpression(term);
    });
}

// vyhodnoti vyraz
function evalExpression(expression) {
    if (!expression.parsed || expression.parsed.length === 0)
        return;
    expression.feedback.message = '';
    try {
        expression.expressionValue = expression.parsed.eval(s.structure, s.variableValues);
    } catch (e) {
        expression.feedback.message = e;
        expression.feedback.type = 'error';
    }
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
        evalExpression(expression);
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
        setConstantsValues();
        setPredicatesValues();
        setFunctionsValues();
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

const defaultExpression = () => ({
    value: '',
    expressionValue: null,
    answerValue: '',
    feedback: {type: null, message: ''},
    inputLocked: false,
    answerLocked: false
});

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