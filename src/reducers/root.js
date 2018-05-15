import Structure from "../model/Structure";
import Language from "../model/Language";
import languageReducer from "./language";
import structureReducer from "./structure";
import expressionsReducer from "./expressions";
import commonReducer from "./common";
import {IMPORT_APP} from "../constants/action_types";
import {defaultInputData} from "../constants";
import {EMPTY_DOMAIN} from "../constants/messages";

const defaultState = {
  structureObject: new Structure(new Language()),
  common: {
    teacherMode: false
  },
  language: {
    constants: defaultInputData(),
    predicates: defaultInputData(),
    functions: defaultInputData(),
  },
  structure: {
    constants: {},
    predicates: {},
    functions: {},
    variables: {...defaultInputData(), object: new Map()},
    domain: {...defaultInputData(), errorMessage: EMPTY_DOMAIN},
  },
  expressions: {
    formulas: [],
    terms: []
  }
};

function checkImportedState(state) {
  if (!state.common || !state.language || !state.structure) {
    throw 'State is not valid!';
  }
  if (!state.language.constants || !state.language.predicates || !state.language.functions) {
    throw 'State is not valid!';
  }

}

function root(state = defaultState, action) {
  if (action.type === IMPORT_APP) {
    try {
      state = JSON.parse(action.content);
      checkImportedState(state);
      state.structureObject = new Structure(new Language());
      state.structure.variables.object = new Map();
    } catch (e) {
      console.error(e);
    }
  }
  let common = commonReducer(state.common, action);
  let language = languageReducer(state.language, action, state.structureObject);
  let structure = structureReducer(state.structure, action, state.structureObject);
  let expressions = expressionsReducer(state.expressions, action, state.structureObject, state.structure.variables.object);
  return {
    structureObject: state.structureObject,
    common: common,
    language: language,
    structure: structure,
    expressions: expressions
  }
}

export default root;