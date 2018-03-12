import Structure from "../../../backend/Structure";
import InvalidLanguageException from "../../../exceptions/InvalidLanguageException";
let parser = require('../../../backend/parser/grammar');

const defaultState = (language) => ({
    object: new Structure(language),
    inputs: {
        domain: {value: '', error: '', locked: false},
        constants: {},
        predicates: {},
        functions: {}
    }
});

function structure(state, action, language) {
    if (state == null) state = defaultState(language);
    let structure = state.object;
    switch (action.type) {
        case 'SET_DOMAIN':
            let domain = {value: action.value, locked: action.locked};
            let parsedValue = null;
            try {
                parsedValue = parser.parse(action.value, {
                    structure: state.object,
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
            let newState = {
                object: structure,
                inputs: {
                    domain: domain,
                    constants: state.inputs.constants,
                    predicates: state.inputs.predicates,
                    functions: state.inputs.functions
                }
            };
            return newState;
        default:
            return state;
    }
}

export default structure;