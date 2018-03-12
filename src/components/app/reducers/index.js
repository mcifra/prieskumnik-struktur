import Language from '../../../backend/Language';
import Structure from '../../../backend/Structure';
import InvalidLanguageException from "../../../exceptions/InvalidLanguageException";

let parser = require('../../../backend/parser/grammar');

// function rootReducer(state = {}, action) {
//     let language = Language(state.language, action);
//     let structure = Structure(state.structure, action, language);
//     let rootState = {language, structure};
//     console.log(rootState);
//     return rootState;
// }

const defaultState = {
    structure: new Structure(new Language()),
    variableValues: new Map(),
    inputs: {
        constants: {value: '', error: '', locked: false},
        predicates: {value: '', error: '', locked: false},
        functions: {value: '', error: '', locked: false},
        variableValues: {value: '', error: '', locked: false},
        structure: {
            domain: {value: '', error: '', locked: false},
            constants: {},
            predicates: {},
            functions: {}
        },
    },
    expressions: {
        formulas: [
            {
                inputValue: '',
                parsedObject: null,
                feedbackMessage: '',
                answer: '',
                inputLocked: false,
                answerLocked: false
            },
        ],
        terms: []
    }
};

function rootReducer(state = defaultState, action) {
    let structure = state.structure;
    switch (action.type) {
        case 'SET_CONSTANTS':
            let constants = {value: action.value, locked: action.locked};
            let iConstants = state.inputs.structure.constants;
            let parsedValue = null;
            try {
                parsedValue = parser.parse(action.value, {startRule: 'language_constants_list'});
                structure.setLanguageConstants(parsedValue);
                constants.error = '';
                iConstants = {};
                for (let i = 0; i < parsedValue.length; i++) {
                    iConstants[parsedValue[i]] = {value: '', error: '', locked: false};
                }
            } catch (e) {
                console.error(e);
                constants.error = e.message;
            }
            let newState = {
                structure: structure,
                inputs: state.inputs,
                expressions: state.expressions
            };
            newState.inputs.constants = constants;
            newState.inputs.structure.constants = iConstants;
            console.log(newState);
            return newState;
        case 'SET_DOMAIN':
            let domain = {value: action.value, locked: action.locked};
            parsedValue = null;
            try {
                parsedValue = parser.parse(action.value, {
                    structure: structure,
                    startRule: 'structure_domain_items_list'
                });
                let newDomain = new Set();
                for (let i = 0; i < parsedValue.length; i++) {
                    if (newDomain.has(parsedValue[i]))
                        throw new InvalidLanguageException('Štruktúra už obsahuje prvok ' + parsedValue[i]);
                    newDomain.add(parsedValue[i]);
                }
                structure.setDomain(newDomain);
                domain.error = '';
            } catch (e) {
                console.error(e);
                domain.error = e.message;
            }
            newState = {
                structure: structure,
                inputs: state.inputs,
                expressions: state.expressions
            };
            newState.inputs.structure.domain = domain;
            return newState;
        case 'SET_CONSTANT_VALUE':
            console.log('action:',action);
            let constant = state.inputs.structure.constants[action.constantName];
            try {
                structure.setConstantValue(action.constantName, action.value);
                constant.value = action.value;
                constant.error = '';
            } catch (e) {
                console.error(e);
                constant.error = e.message;
            }
            newState = {
                structure: structure,
                inputs: state.inputs,
                expressions: state.expressions
            };
            newState.inputs.structure.constants[action.constantName] = constant;
            return newState;
        default:
            return state;
    }
}

export default rootReducer;