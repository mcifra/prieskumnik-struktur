import reducer from '../reducers/index';
import Structure from "../model/Structure";
import Language from "../model/Language";
import {STUDENT_MODE} from "../constants";

describe('reducer', () => {
  it('vratenie init stavu', () => {
    expect(reducer(undefined, {})).toEqual({
      structure: new Structure(new Language()),
      variableValues: new Map(),
      mode: STUDENT_MODE,
      teacherMode: false,
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
    })
  })
});