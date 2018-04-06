/**
 * Represent language of logic
 * @author Milan Cifra
 * @class
 */
class Language {

    constructor() {
        this.constants = new Set();
        this.functions = new Map();
        this.predicates = new Map();
    }

    getConstants() {
        return this.constants;
    }

    hasItem(item) {
        return this.hasConstant(item) || this.hasFunction(item) || this.hasPredicate(item);
    }

    clear() {
        this.clearConstants();
        this.clearPredicates();
        this.clearFunctions();
    }

    clearConstants() {
        this.constants.clear();
    }

    clearFunctions() {
        this.functions.clear();
    }

    clearPredicates() {
        this.predicates.clear();
    }

    setConstants(constants) {
        this.clearConstants();
        let message = '';
        constants.forEach(c => {
            if (this.functions.has(c)) {
                message = 'Jazyk štruktúry už obsahuje funkciu ' + c;
                return;
            }
            if (this.predicates.has(c)) {
                message = 'Jazyk štruktúry už obsahuje predikát ' + c;
                return;
            }
            this.addConstant(c);
        });
        return message;
    }

    setPredicates(predicates) {
        this.clearPredicates();
        let message = '';
        predicates.forEach(p => {
            if (this.constants.has(p.name)) {
                message = 'Jazyk štruktúry už obsahuje konštantu ' + p.name;
                return;
            }
            if (this.functions.has(p.name)) {
                message = 'Jazyk štruktúry už obsahuje funkciu ' + p.name;
                return;
            }
            this.addPredicate(p.name, parseInt(p.arity));
        });
        return message;
    }

    setFunctions(functions) {
        this.clearFunctions();
        let message = '';
        functions.forEach(f => {
            if (this.constants.has(f.name)) {
                message = 'Jazyk štruktúry už obsahuje konštantu ' + f.name;
                return;
            }
            if (this.predicates.has(f.name)) {
                message = 'Jazyk štruktúry už obsahuje predikát ' + f.name;
                return;
            }
            this.addFunction(f.name, parseInt(f.arity));
        });
        return message;
    }

    /**
     * Add constant name to the language
     * @param {string} constantName Constant name
     */
    addConstant(constantName) {
        this.constants.add(constantName);
    }

    /**
     * Add predicate name to the language
     * @param {string} predicateName Name of the predicate
     * @param {int} arity Arity of predicate
     */
    addPredicate(predicateName, arity) {
        this.predicates.set(predicateName, arity);
    }

    /**
     * Add function name to the language
     * @param {string} functionName Name of function
     * @param {int} arity Arity of function
     */
    addFunction(functionName, arity) {
        this.functions.set(functionName, arity);
    }

    hasConstant(constantName) {
        return this.constants.has(constantName);
    }

    hasPredicate(predicateName) {
        let splited = predicateName.split('/');
        if (splited.length !== 2) {
            return this.predicates.has(splited[0]);
        }
        if (isNaN(parseInt(splited[1]))) {
            return false;
        }
        return this.predicates.has(splited[0]) && this.predicates.get(splited[0]) === parseInt(splited[1]);
    }

    hasFunction(functionName) {
        let splited = functionName.split('/');
        if (splited.length !== 2) {
            return this.functions.has(splited[0]);
        }
        if (isNaN(parseInt(splited[1]))) {
            return false;
        }
        return this.functions.has(splited[0]) && this.functions.get(splited[0]) === parseInt(splited[1]);
    }

    /**
     * Return arity of the function
     * @param {string} functionName
     * @return {int} arity of the function
     */
    getFunction(functionName) {
        return this.functions.get(functionName);
    }

    /**
     * Return arity of the predicate
     * @param {string} predicateName
     * @return {int} arity of the predicate
     */
    getPredicate(predicateName) {
        return this.predicates.get(predicateName);
    }

}

export default Language;