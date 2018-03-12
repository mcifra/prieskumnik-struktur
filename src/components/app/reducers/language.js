import Language from "../../../backend/Language";

let parser = require('../../../backend/parser/grammar');

const defaultState = {
    object: new Language(),
    inputs: {
        constants: {value: '', error: '', locked: false},
        predicates: {value: '', error: '', locked: false},
        functions: {value: '', error: '', locked: false}
    }
};

function language(state = defaultState, action) {
    let language = state.object;
    switch (action.type) {
        case 'SET_CONSTANTS':
            let constants = {value: action.value, locked: action.locked};
            let parsedValue = null;
            try {
                parsedValue = parser.parse(action.value, {startRule: 'language_constants_list'});
                language.setConstants(parsedValue);
                constants.error = '';
            } catch (e) {
                console.error(e);
                constants.error = e.message;
            }
            let newState = {
                object: language,
                inputs: {
                    constants: constants,
                    predicates: state.inputs.predicates,
                    functions: state.inputs.functions
                }
            };
            return newState;
        case 'SET_PREDICATES':
            language.setPredicates(action.predicates);
            newState = {
                object: language,
                inputs: {
                    constants: state.inputs.constants,
                    predicates: {value: action.value, error: action.error, locked: action.locked},
                    functions: state.inputs.functions
                }
            };
            return newState;
        case 'SET_FUNCTIONS':
            language.setFunctions(action.functions);
            newState = {
                object: language,
                inputs: {
                    constants: state.inputs.constants,
                    predicates: state.inputs.predicates,
                    functions: {value: action.value, error: action.error, locked: action.locked}
                }
            };
            return newState;
        default:
            return state;
    }
}

export default language;