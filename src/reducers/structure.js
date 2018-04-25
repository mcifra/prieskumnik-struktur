import {PREDICATE} from "../constants";

let functions = require('./functions');

let state = {};
let structure = null;

function structureReducer(s, action, struct) {
   state = copyState(s);
   structure = struct;
   switch (action.type) {
      case 'SET_CONSTANTS':
      case 'SET_PREDICATES':
      case 'SET_FUNCTIONS':
         syncLanguageWithStructure();
         setVariables();
         return state;
      case 'SET_CONSTANT_VALUE':
         setConstantValue(action.constantName, action.value);
         return state;
      case 'SET_PREDICATE_VALUE_TEXT':
         functions.parseText(action.value, state.predicates[action.predicateName], {startRule: 'tuples'});
         setPredicateValue(action.predicateName);
         return state;
      case 'SET_FUNCTION_VALUE_TEXT':
         functions.parseText(action.value, state.functions[action.functionName], {startRule: 'tuples'});
         setFunctionValue(action.functionName);
         return state;
      case 'SET_PREDICATE_VALUE_TABLE':
         if (action.checked)
            addPredicateValue(action.predicateName, action.value);
         else
            removePredicateValue(action.predicateName, action.value);
         let predicateValue = structure.getPredicateValue(action.predicateName);
         state.predicates[action.predicateName].parsed = predicateValue;
         state.predicates[action.predicateName].value = predicateValueToString(predicateValue);
         return state;
      case 'SET_FUNCTION_VALUE_TABLE':
         let tuple = action.value;
         addFunctionValue(action.functionName, tuple);
         let functionValue = structure.getFunctionValueArray(action.functionName);
         state.functions[action.functionName].parsed = functionValue;
         state.functions[action.functionName].value = predicateValueToString(functionValue);
         return state;
      case 'SET_VARIABLES_VALUE':
         functions.parseText(action.value, state.variables, {structure: structure, startRule: 'e_tuples',});
         setVariables();
         return state;
      case 'SET_DOMAIN':
         functions.parseText(action.value, state.domain, {startRule: 'domain'});
         setDomain();
         setConstantsValues();
         setPredicatesValues();
         setFunctionsValues();
         setVariables();
         return state;
      case 'TOGGLE_EDIT_TABLE':
         toggleEditTable(action);
         return state;
      case 'LOCK_DOMAIN':
         state.domain.locked = !state.domain.locked;
         return state;
      case 'LOCK_CONSTANT_VALUE':
         state.constants[action.constantName].locked = !state.constants[action.constantName].locked;
         return state;
      case 'LOCK_PREDICATE_VALUE':
         state.predicates[action.predicateName].locked = !state.predicates[action.predicateName].locked;
         return state;
      case 'LOCK_FUNCTION_VALUE':
         state.functions[action.functionName].locked = !state.functions[action.functionName].locked;
         return state;
      case 'LOCK_VARIABLES':
         state.variables.locked = !state.variables.locked;
         return state;
      case 'IMPORT_APP':
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

function toggleEditTable(action) {
   let input = action.itemType === PREDICATE ? state.predicates[action.name] : state.functions[action.name];
   if (!input) {
      return;
   }
   input.tableEnabled = !input.tableEnabled;
}

function setDomain() {
   if (!state.domain.parsed)
      return;
   let message = '';
   if (state.domain.parsed.length === 0) {
      message = 'Doména nesmie byť prázdna';
      state.domain.feedback.type = 'error';
   }
   structure.setDomain(state.domain.parsed);
   state.domain.feedback.message = message;
}

function setConstantsValues() {
   let constants = Object.keys(state.constants);
   constants.forEach(c => {
      setConstantValue(c, state.constants[c].value);
   })
}

function setPredicatesValues() {
   let predicates = Object.keys(state.predicates);
   predicates.forEach(predicate => {
      setPredicateValue(predicate);
   })
}

function setFunctionsValues() {
   let functions = Object.keys(state.functions);
   functions.forEach(f => {
      setFunctionValue(f);
   })
}

function syncLanguageWithStructure() {
   syncSymbolsWithStructure(state.constants, structure.language.constants, {
      value: '',
      feedback: {type: 'error', message: 'Interpretačná hodnota konštanty nesmie byť prázdna'},
      locked: false
   });
   syncSymbolsWithStructure(state.predicates, structure.language.predicates, {
      value: '',
      feedback: {type: null, message: ''},
      locked: false,
      tableEnabled: false
   });
   syncSymbolsWithStructure(state.functions, structure.language.functions, {
      value: '',
      feedback: {type: null, message: ''},
      locked: false,
      tableEnabled: false
   });
}

function syncSymbolsWithStructure(stateSymbols, structureSymbols, defaultStateObject) {
   let inputs = Object.keys(stateSymbols);
   inputs.forEach(e => {
      if (!structureSymbols.has(e)) {
         delete stateSymbols[e];
      }
   });
   if (structureSymbols instanceof Map) {
      structureSymbols.forEach((value, key) => {
         if (!stateSymbols[key + '/' + value]) {
            stateSymbols[key + '/' + value] = defaultStateObject;
         }
      })
   } else {
      structureSymbols.forEach(e => {
         if (!stateSymbols[e]) {
            stateSymbols[e] = defaultStateObject;
         }
      })
   }
}

function setVariables() {
   if (!state.variables.parsed) {
      return; // zle sparsovane
   }
   if (!state.variables.object || !state.variables.object instanceof Map) {
      state.variables.object = new Map();
   } else {
      state.variables.object.clear();
   }
   let feedback = {type: null, message: ''};
   state.variables.parsed.forEach(tuple => {
      let variable = tuple[0];
      let value = tuple[1];
      if (structure.language.hasItem(variable)) {
         feedback.message = 'Jazyk už obsahuje prvok ' + variable;
         feedback.type = 'error';
      }
      else if (!structure.hasDomainItem(value)) {
         feedback.message = 'Doména štruktúry neobsahuje prvok ' + value;
         feedback.type = 'error';
      }
      else state.variables.object.set(variable, value);
   });
   state.variables.feedback = feedback;
}

function setConstantValue(constantName, value) {
   state.constants[constantName].value = value;
   state.constants[constantName].feedback.message = '';
   try {
      structure.setConstantValue(constantName, value);
   } catch (e) {
      console.error(e);
      state.constants[constantName].feedback.message = e.message;
      state.constants[constantName].feedback.type = 'error';
      state.constants[constantName].value = '';
   }
}

function setPredicateValue(predicateName) {
   if (!state.predicates[predicateName] || !state.predicates[predicateName].parsed)
      return;
   structure.clearPredicateValue(predicateName);
   state.predicates[predicateName].feedback.message = '';
   state.predicates[predicateName].feedback.type = null;
   state.predicates[predicateName].parsed.forEach(tuple => {
      addPredicateValue(predicateName, tuple);
   });
}

function addPredicateValue(predicateName, tuple) {
   try {
      structure.addPredicateValue(predicateName, tuple);
   } catch (e) {
      state.predicates[predicateName].feedback.message = e;
      state.predicates[predicateName].feedback.type = 'error';
   }
}

function removePredicateValue(predicateName, tuple) {
   structure.removePredicateValue(predicateName, tuple);
}

function setFunctionValue(functionName) {
   if (!state.functions[functionName] || !state.functions[functionName].parsed)
      return;
   structure.clearFunctionValue(functionName);
   state.functions[functionName].feedback.message = '';
   state.functions[functionName].feedback.type = null;
   state.functions[functionName].parsed.forEach(tuple => {
      addFunctionValue(functionName, tuple);
   });
}

function addFunctionValue(functionName, tuple) {
   try {
      structure.addFunctionValue(functionName, tuple);
   } catch (e) {
      console.error(e);
      state.functions[functionName].feedback.message = e;
      state.functions[functionName].feedback.type = 'error';
   }
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