import reducer from '../../reducers/root';
import Structure from "../../model/Structure";
import Language from "../../model/Language";
import {STUDENT_MODE} from "../../constants/index";
import {
  setConstants, setConstantValue, setDomain, setFunctions, setFunctionValueText, setPredicates, setPredicateValueText,
  toggleTeacherMode
} from "../../actions/index";
import {EMPTY_CONSTANT_VALUE} from "../../constants/messages";

describe('reducer', () => {
  it('vratenie init stavu', () => {
    expect(reducer(undefined, {})).toEqual({
      structureObject: new Structure(new Language()),
      common: {
        teacherMode: false
      },
      language: {
        constants: {value: '', locked: false, errorMessage: '', parsed: []},
        predicates: {value: '', locked: false, errorMessage: '', parsed: []},
        functions: {value: '', locked: false, errorMessage: '', parsed: []},
      },
      structure: {
        constants: {},
        predicates: {},
        functions: {},
        variables: {value: '', locked: false, errorMessage: '', parsed: [], object: new Map()},
        domain: {value: '', locked: false, errorMessage: 'Doména nesmie byť prázdna', parsed: []},
      },
      expressions: {
        formulas: [],
        terms: []
      }
    })
  })
});

describe('zamykanie vstupov', () => {
  let defaultState = () => ({
    structureObject: new Structure(new Language()),
    common: {
      teacherMode: false
    },
    language: {
      constants: {value: '', locked: false, errorMessage: '', parsed: []},
      predicates: {value: '', locked: false, errorMessage: '', parsed: []},
      functions: {value: '', locked: false, errorMessage: '', parsed: []},
    },
    structure: {
      constants: {},
      predicates: {},
      functions: {},
      variables: {value: '', locked: false, errorMessage: '', parsed: [], object: new Map()},
      domain: {value: '', locked: false, errorMessage: 'Doména nesmie byť prázdna', parsed: []},
    },
    expressions: {
      formulas: [],
      terms: []
    }
  });
  it('should change mode to teacher', () => {
    let newState = reducer(defaultState(), toggleTeacherMode());
    expect(newState.common.teacherMode).toBeTruthy();
  });
  it('should add constant to language', () => {
    let inputValue = 'a';
    let state = reducer(defaultState(), setConstants(inputValue));
    expect(state.language.constants).toEqual({
      value: inputValue,
      locked: false,
      errorMessage: '',
      parsed: ['a']
    });
    expect(state.structure.constants).toEqual({
      'a': {
        value: '',
        errorMessage: EMPTY_CONSTANT_VALUE,
        locked: false
      }
    });
    expect(Array.from(state.structureObject.language.getConstants())).toEqual(['a']);
  });
  it('should add and delete constant from language', () => {
    let inputValue = 'a';
    let state = reducer(defaultState(), setConstants(inputValue));
    let inputValue2 = '';
    state = reducer(state, setConstants(inputValue2));
    expect(state.language.constants).toEqual({
      value: inputValue2,
      locked: false,
      errorMessage: '',
      parsed: []
    });
  });
  it('should sync stuff', () => {
    let state = defaultState();
    state = reducer(state, setConstants('a'));
    state = reducer(state, setPredicates('likes/2'));
    state = reducer(state, setFunctions('mother/1'));
    state = reducer(state, setDomain('1,2,3'));
    // expect(state.structure.domain).toEqual({value: '1,2,3', locked: false, errorMessage: '', parsed: ['1', '2', '3']});
    state = reducer(state, setConstantValue('1', 'a'));
    state = reducer(state, setPredicateValueText('(1,2)', 'likes/2'));
    state = reducer(state, setFunctionValueText('(1,2)', 'mother/1'));
    state =  reducer(state, setDomain('3'));
    expect(state.structure.constants['a']).toEqual({value: '', errorMessage: EMPTY_CONSTANT_VALUE, locked: false});
    expect(state.structure.predicates['likes/2']).toEqual({
      value: '(1,2)',
      errorMessage: 'Prvok 1 nie je v doméne štruktúry',
      locked: false,
      tableEnabled: false,
      parsed: [["1", "2"]]
    });
    expect(state.structureObject.getPredicateValue('likes/2')).toEqual([]);
  });
});