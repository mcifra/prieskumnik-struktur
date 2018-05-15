import reducer from '../reducers/root';
import Language from "../model/Language";
import Structure from "../model/Structure";
import {setConstants, setConstantValue, setDomain} from "../actions";
import {EMPTY_CONSTANT_VALUE} from "../constants/messages";

describe('constants', () => {
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
  it('should add', () => {
    let inValue = 'a,b';
    let exParsed = ['a', 'b'];
    let state = defaultState();
    state = reducer(state, setConstants(inValue));
    expect(state.language.constants).toEqual({value: inValue, locked: false, errorMessage: '', parsed: exParsed});
    expect(state.structureObject.language.getConstants()).toEqual(new Set(exParsed));
    expect(state.structure.constants).toEqual({
      'a': {
        value: '',
        errorMessage: EMPTY_CONSTANT_VALUE,
        locked: false
      },
      'b': {
        value: '',
        errorMessage: EMPTY_CONSTANT_VALUE,
        locked: false
      }
    });
  });
  it('should ignore duplicates', () => {
    let inValue = 'a,a,b';
    let exParsed = ['a', 'a', 'b'];
    let state = defaultState();
    state = reducer(state, setConstants(inValue));
    expect(state.language.constants).toEqual({value: inValue, locked: false, errorMessage: '', parsed: exParsed});
    expect(state.structureObject.language.getConstants()).toEqual(new Set(['a', 'b']));
    expect(state.structure.constants).toEqual({
      'a': {
        value: '',
        errorMessage: EMPTY_CONSTANT_VALUE,
        locked: false
      },
      'b': {
        value: '',
        errorMessage: EMPTY_CONSTANT_VALUE,
        locked: false
      }
    });
  });
  it('should delete all', () => {
    let inValue1 = 'a,b';
    let inValue2 = '';
    let exParsed = [];
    let state = defaultState();
    state = reducer(state, setConstants(inValue1));
    state = reducer(state, setConstants(inValue2));
    expect(state.language.constants).toEqual({value: inValue2, locked: false, errorMessage: '', parsed: exParsed});
    expect(state.structureObject.language.getConstants()).toEqual(new Set());
    expect(state.structure.constants).toEqual({});
  });
  it('should set value', () => {
    let state = defaultState();
    state = reducer(state, setConstants('a,b'));
    state = reducer(state, setDomain('1,2'));
    state = reducer(state, setConstantValue('1', 'a'));
    expect(state.structure.constants['a']).toEqual({value: '1', errorMessage: '', locked: false});
    expect(state.structureObject.getConstantValue('a')).toEqual('1');
  });
  it('should delete value', () => {
    let state = defaultState();
    state = reducer(state, setConstants('a'));
    state = reducer(state, setDomain('1'));
    state = reducer(state, setConstantValue('1', 'a'));
    state = reducer(state, setConstantValue('', 'a'));
    expect(state.structure.constants['a']).toEqual({value: '', errorMessage: EMPTY_CONSTANT_VALUE, locked: false});
    expect(state.structureObject.getConstantValue('a')).toBeUndefined();
  });

});