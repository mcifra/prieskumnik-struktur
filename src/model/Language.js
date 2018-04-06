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

    hasItem(item) {
        return this.hasConstant(item) || this.hasFunction(item) || this.hasPredicate(item);
    }

    clearAll() {
        this.constants = new Set();
        this.functions = new Map();
        this.predicates = new Map();
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
        this.constants = new Set(constants);
        this.constants.clear();
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
            this.constants.add(c);
        });
        return message;
    }

    setPredicates(predicates) {
        let message = '';
        let newPredicates = new Map();
        for (let i = 0; i < predicates.length; i++) {
            if (this.constants.has(predicates[i].name)) {
                message = 'Jazyk štruktúry už obsahuje konštantu ' + predicates[i].name;
            }
            if (this.functions.has(predicates[i].name)) {
                message = 'Jazyk štruktúry už obsahuje funkciu ' + predicates[i].name;
            }
            newPredicates.set(predicates[i].name, predicates[i].arity);
        }
        this.predicates = newPredicates;
        return message;
    }

    setFunctions(functions) {
        let message = '';
        let newFunctions = new Map();
        for (let i = 0; i < functions.length; i++) {
            if (this.constants.has(functions[i].name)) {
                message = 'Jazyk štruktúry už obsahuje konštantu ' + functions[i].name;
            }
            if (this.predicates.has(functions[i].name)) {
                message = 'Jazyk štruktúry už obsahuje predikát ' + functions[i].name;
            }
            newFunctions.set(functions[i].name, functions[i].arity);
        }
        this.functions = newFunctions;
        return message;
    }

    // /**
    //  * Add constant name to the language
    //  * @param {string} constantName Constant name
    //  */
    // addConstant(constantName) {
    //     this.constants.add(constantName);
    // }

    // /**
    //  * Add function name to the language
    //  * @param {string} functionName Name of function
    //  * @param {int} arity Arity of function
    //  */
    // addFunction(functionName, arity) {
    //     this.functions.set(functionName, arity);
    // }

    // /**
    //  * Add predicate name to the language
    //  * @param {string} predicateName Name of the predicate
    //  * @param {int} arity Arity of predicate
    //  */
    // addPredicate(predicateName, arity) {
    //     this.predicates.set(predicateName, arity);
    // }

    hasConstant(constantName) {
        return this.constants.has(constantName);
    }

    hasFunction(functionName) {
        let splited = functionName.split('/');
        if (splited.length !== 2 || isNaN(parseInt(splited[1])))
            return null;
        return this.functions.has(splited[0]) && this.functions.get(splited[0]) === parseInt(splited[1]);
    }

    hasPredicate(predicateName) {
        let splited = predicateName.split('/');
        if (splited.length !== 2) {
            return this.predicates.has(splited[0]);
        }
        if (isNaN(parseInt(splited[1]))) {
            return false;
        }
        return this.predicates.has(splited[0]) && this.predicates.get(splited[0]) == parseInt(splited[1]);
    }

    // deleteConstant(constantName) {
    //     this.constants.delete(constantName);
    // }
    //
    // deleteFunction(functionName) {
    //     this.functions.delete(functionName);
    // }
    //
    // deletePredicate(predicateName) {
    //     this.predicates.delete(predicateName);
    // }

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