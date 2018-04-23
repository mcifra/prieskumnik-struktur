let functions = require('./functions');

let state = {};
let structure = null;

function languageReducer(s, action, struct) {
   state = copyState(s);
   structure = struct;
   switch (action.type) {
      case 'SET_CONSTANTS':
         functions.parseText(action.value, state.constants, {startRule: 'constants'});
         if (state.constants.parsed) {
            setConstants();
            setPredicates();
            setFunctions();
         }
         return state;
      case 'SET_PREDICATES':
         functions.parseText(action.value, state.predicates, {startRule: 'predicates'});
         if (state.predicates.parsed) {
            setPredicates();
            setConstants();
            setFunctions();
         }
         return state;
      case 'SET_FUNCTIONS':
         functions.parseText(action.value, state.functions, {startRule: 'functions'});
         if (state.functions.parsed) {
            setFunctions();
            setPredicates();
            setConstants();
         }
         return state;
      case 'LOCK_CONSTANTS':
         state.constants.locked = !state.constants.locked;
         return state;
      case 'LOCK_PREDICATES':
         state.predicates.locked = !state.predicates.locked;
         return state;
      case 'LOCK_FUNCTIONS':
         state.functions.locked = !state.functions.locked;
         return state;
      case 'IMPORT_APP':
         setConstants();
         setPredicates();
         setFunctions();
         return state;
      default:
         return state;
   }
}

function setConstants() {
   if (!state.constants.parsed)
      return;
   state.constants.feedback.message = structure.setLanguageConstants(state.constants.parsed);
}

function setPredicates() {
   if (!state.predicates.parsed)
      return;
   state.predicates.feedback.message = structure.setLanguagePredicates(state.predicates.parsed);
}

function setFunctions() {
   if (!state.functions.parsed)
      return;
   state.functions.feedback.message = structure.setLanguageFunctions(state.functions.parsed);
}

function copyState(state) {
   return {
      ...state,
      constants: {...state.constants},
      predicates: {...state.predicates},
      functions: {...state.functions}
   }
}

export default languageReducer;