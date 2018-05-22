import {defaultInputData, PREDICATE} from "../constants";
import {
  IMPORT_APP, LOCK_CONSTANT_VALUE, LOCK_DOMAIN, LOCK_FUNCTION_VALUE, LOCK_PREDICATE_VALUE, LOCK_VARIABLES,
  SET_CONSTANT_VALUE, SET_CONSTANTS, SET_DOMAIN, SET_FUNCTION_VALUE_TABLE, SET_FUNCTION_VALUE_TEXT, SET_FUNCTIONS,
  SET_PREDICATE_VALUE_TABLE,
  SET_PREDICATE_VALUE_TEXT,
  SET_PREDICATES, SET_VARIABLES_VALUE, TOGGLE_EDIT_TABLE
} from "../constants/action_types";
import {
  EMPTY_CONSTANT_VALUE, EMPTY_DOMAIN, FUNCTION_ALREADY_DEFINED, FUNCTION_NOT_FULL_DEFINED, ITEM_IN_LANGUAGE,
  ITEM_NOT_IN_DOMAIN
} from "../constants/messages";
import {RULE_DOMAIN, RULE_PREDICATES_FUNCTIONS_VALUE, RULE_VARIABLE_VALUATION} from "../constants/parser_start_rules";

let functions = require('./functions');

const constantDefaultInput = () => ({...defaultInputData(), errorMessage: EMPTY_CONSTANT_VALUE});
const predicateDefaultInput = () => ({...defaultInputData(), tableEnabled: false});
const functionDefaultInput = () => predicateDefaultInput();

let state = {};
let structure = null;

function structureReducer(s, action, struct) {
  state = copyState(s);
  structure = struct;
  switch (action.type) {
    case SET_CONSTANTS:
    case SET_PREDICATES:
    case SET_FUNCTIONS:
      syncLanguageWithStructure();
      setVariables();
      return state;
    case SET_CONSTANT_VALUE:
      setConstantValue(action.constantName, action.value);
      return state;
    case SET_PREDICATE_VALUE_TEXT:
      functions.parseText(action.value, state.predicates[action.predicateName], {startRule: RULE_PREDICATES_FUNCTIONS_VALUE});
      setPredicateValue(action.predicateName);
      return state;
    case SET_PREDICATE_VALUE_TABLE:
      if (action.checked) {
        addPredicateValue(action.predicateName, action.value);
      } else {
        removePredicateValue(action.predicateName, action.value);
      }
      let predicateValue = structure.getPredicateValue(action.predicateName);
      state.predicates[action.predicateName].parsed = predicateValue;
      state.predicates[action.predicateName].value = predicateValueToString(predicateValue);
      return state;
    case SET_FUNCTION_VALUE_TEXT:
      functions.parseText(action.value, state.functions[action.functionName], {startRule: RULE_PREDICATES_FUNCTIONS_VALUE});
      setFunctionValue(action.functionName);
      return state;
    case SET_FUNCTION_VALUE_TABLE:
      let tuple = action.value;
      let params = tuple.slice(0, tuple.length - 1);
      let value  = tuple[tuple.length - 1];
      structure.changeFunctionValue(action.functionName, params, value);
      let fValue = structure.getFunctionValueArray(action.functionName);
      state.functions[action.functionName].parsed = fValue;
      state.functions[action.functionName].value = predicateValueToString(fValue);
      state.functions[action.functionName].errorMessage = '';
      if (!checkFunctionValue(action.functionName)) {
        state.functions[action.functionName].errorMessage = FUNCTION_NOT_FULL_DEFINED;
      }
      return state;
    case SET_VARIABLES_VALUE:
      functions.parseText(action.value, state.variables, {structure: structure, startRule: RULE_VARIABLE_VALUATION});
      setVariables();
      return state;
    case SET_DOMAIN:
      functions.parseText(action.value, state.domain, {startRule: RULE_DOMAIN});
      setDomain();
      setConstantsValues();
      setPredicatesValues();
      setFunctionsValues();
      setVariables();
      return state;
    case TOGGLE_EDIT_TABLE:
      let input = action.itemType === PREDICATE ? state.predicates[action.name] : state.functions[action.name];
      if (input) {
        input.tableEnabled = !input.tableEnabled;
      }
      return state;
    case LOCK_DOMAIN:
      state.domain.locked = !state.domain.locked;
      return state;
    case LOCK_CONSTANT_VALUE:
      state.constants[action.constantName].locked = !state.constants[action.constantName].locked;
      return state;
    case LOCK_PREDICATE_VALUE:
      state.predicates[action.predicateName].locked = !state.predicates[action.predicateName].locked;
      return state;
    case LOCK_FUNCTION_VALUE:
      state.functions[action.functionName].locked = !state.functions[action.functionName].locked;
      return state;
    case LOCK_VARIABLES:
      state.variables.locked = !state.variables.locked;
      return state;
    case IMPORT_APP:
      setDomain();
      setConstantsValues();
      setPredicatesValues();
      setFunctionsValues();
      setVariables();
      return state;
    default:
      return state;
  }
}

function setDomain() {
  if (!state.domain.parsed) {
    return;
  }
  state.domain.errorMessage = state.domain.parsed.length > 0 ? '' : EMPTY_DOMAIN;
  structure.setDomain(state.domain.parsed);
}

function setConstantsValues() {
  Object.keys(state.constants).forEach(c => {
    setConstantValue(c, state.constants[c].value);
  })
}

function setPredicatesValues() {
  Object.keys(state.predicates).forEach(predicate => {
    setPredicateValue(predicate);
  })
}

function setFunctionsValues() {
  Object.keys(state.functions).forEach(f => {
    setFunctionValue(f);
  })
}

function syncLanguageWithStructure() {
  deleteUnusedInputs();
  insertNewInputs();
}

function deleteUnusedInputs() {
  Object.keys(state.constants).forEach(e => {
    if (!structure.language.hasConstant(e)) {
      delete state.constants[e];
    }
  });
  Object.keys(state.predicates).forEach(e => {
    if (!structure.language.hasPredicate(e)) {
      delete state.predicates[e];
    }
  });
  Object.keys(state.functions).forEach(e => {
    if (!structure.language.hasFunction(e)) {
      delete state.functions[e];
    }
  });
}

function insertNewInputs() {
  structure.language.getConstants().forEach(e => {
    if (!state.constants[e]) {
      state.constants[e] = constantDefaultInput();
    }
  });
  structure.language.predicates.forEach((arity, predicate) => {
    if (!state.predicates[predicate + '/' + arity])
      state.predicates[predicate + '/' + arity] = predicateDefaultInput()
  });
  structure.language.functions.forEach((arity, func) => {
    if (!state.functions[func + '/' + arity]) {
      state.functions[func + '/' + arity] = functionDefaultInput();
    }
  });
}

function setVariables() {
  if (!state.variables.parsed) {
    return;
  }
  if (!state.variables.object || !state.variables.object instanceof Map) {
    state.variables.object = new Map();
  } else {
    state.variables.object.clear();
  }
  let errorMessage = '';
  state.variables.parsed.forEach(tuple => {
    let variable = tuple[0];
    let value = tuple[1];
    if (structure.language.hasItem(variable)) {
      errorMessage = ITEM_IN_LANGUAGE(variable);
    }
    else if (!structure.hasDomainItem(value)) {
      errorMessage = ITEM_NOT_IN_DOMAIN(value);
    }
    else {
      state.variables.object.set(variable, value);
    }
  });
  state.variables.errorMessage = errorMessage;
}

function setConstantValue(constantName, value) {
  try {
    structure.setConstantValue(constantName, value);
    state.constants[constantName].value = value;
    state.constants[constantName].errorMessage = '';
  } catch (e) {
    console.error(e);
    state.constants[constantName].errorMessage = e;
    state.constants[constantName].value = '';
  }
}

function setPredicateValue(predicateName) {
  if (!state.predicates[predicateName] || !state.predicates[predicateName].parsed) {
    return;
  }
  structure.clearPredicateValue(predicateName);
  state.predicates[predicateName].errorMessage = '';
  state.predicates[predicateName].parsed.forEach(tuple => {
    addPredicateValue(predicateName, tuple);
  });
}

function addPredicateValue(predicateName, tuple) {
  try {
    structure.setPredicateValue(predicateName, tuple);
  } catch (e) {
    state.predicates[predicateName].errorMessage = e;
  }
}

function removePredicateValue(predicateName, tuple) {
  structure.removePredicateValue(predicateName, tuple);
}

function setFunctionValue(functionName) {
  if (!state.functions[functionName] || !state.functions[functionName].parsed) {
    return;
  }
  structure.clearFunctionValue(functionName);
  state.functions[functionName].errorMessage = '';
  let usedParams = [];
  state.functions[functionName].parsed.forEach(tuple => {
    try {
      let params = tuple.slice(0, tuple.length - 1);
      let stringifiedParams = JSON.stringify(params);
      let value = tuple[tuple.length - 1];
      if (usedParams.indexOf(stringifiedParams) > -1) {
        structure.removeFunctionValue(functionName, params);
        throw FUNCTION_ALREADY_DEFINED(params);
      } else {
        usedParams.push(stringifiedParams);
        structure.setFunctionValue(functionName, params, value);
      }
    } catch (e) {
      console.error(e);
      state.functions[functionName].errorMessage = e;
    }
  });
  let validValue = checkFunctionValue(functionName);
  if (!validValue) {
    if (state.functions[functionName].errorMessage.length === 0) {
      state.functions[functionName].errorMessage = FUNCTION_NOT_FULL_DEFINED;
    }
  } else {
    if (state.functions[functionName].errorMessage === FUNCTION_NOT_FULL_DEFINED) {
      state.functions[functionName].errorMessage = '';
    }
  }
}

function checkFunctionValue(functionName) {
  let arity = parseInt(functionName.split('/')[1]);
  if (structure.domain.size > 0) {
    if (!structure.iFunction.has(functionName) ||
       Object.keys(structure.iFunction.get(functionName)).length != structure.domainCombinations.get(arity).length) {
      return false;
    }
  }
  return true;
}

const copyState = (state) => ({
  ...state,
  constants: {...state.constants},
  predicates: {...state.predicates},
  functions: {...state.functions},
  variables: {...state.variables},
  domain: {...state.domain}
});

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

export default structureReducer;