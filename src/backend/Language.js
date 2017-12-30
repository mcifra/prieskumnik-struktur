/**
 * Represent language of logic
 * @author Milan Cifra
 * @class
 */
import InvalidLanguageException from "../exceptions/InvalidLanguageException";

class Language {

    /**
     *
     * @param {Set.<string>} constants Names of constants
     * @param {Map.<string, int>} functions Names of functions
     * @param {Map.<string, int>} predicates Names of predicates
     */
    constructor(constants = new Set(), functions = new Map(), predicates = new Map()) {
        this.constants = constants;
        this.functions = functions;
        this.predicates = predicates;
    }

    clearAll() {
        this.constants = new Set();
        this.functions = new Map();
        this.predicates = new Map();
    }

    clearConstants() {
        this.constants = new Set();
    }

    clearFunctions() {
        this.functions = new Map();
    }

    clearPredicates() {
        this.predicates = new Map();
    }

    /**
     * Add constant name to the language
     * @param {string} constantName Constant name
     */
    addConstant(constantName) {
        if (this.hasConstant(constantName)) {
            throw new InvalidLanguageException('Jazyk uz obsahuje konstantu ' + constantName);
        }
        if (this.hasFunction(constantName)) {
            throw new InvalidLanguageException('Jazyk uz obsahuje funkciu ' + constantName);
        }
        if (this.hasPredicate(constantName)) {
            throw new InvalidLanguageException('Jazyk uz obsahuje predikat ' + constantName);
        }
        this.constants.add(constantName);
    }

    /**
     * Add function name to the language
     * @param {string} functionName Name of function
     * @param {int} arity Arity of function
     */
    addFunction(functionName, arity) {
        if (this.hasConstant(functionName)) {
            throw new InvalidLanguageException('Jazyk uz obsahuje konstantu ' + functionName);
        }
        if (this.hasFunction(functionName)) {
            throw new InvalidLanguageException('Jazyk uz obsahuje funkciu ' + functionName);
        }
        if (this.hasPredicate(functionName)) {
            throw new InvalidLanguageException('Jazyk uz obsahuje predikat ' + functionName);
        }
        this.functions.set(functionName, arity);
    }

    /**
     * Add predicate name to the language
     * @param {string} predicateName Name of the predicate
     * @param {int} arity Arity of predicate
     */
    addPredicate(predicateName, arity) {
        if (this.hasConstant(predicateName)) {
            throw new InvalidLanguageException('Jazyk uz obsahuje konstantu ' + predicateName);
        }
        if (this.hasFunction(predicateName)) {
            throw new InvalidLanguageException('Jazyk uz obsahuje funkciu ' + predicateName);
        }
        if (this.hasPredicate(predicateName)) {
            throw new InvalidLanguageException('Jazyk uz obsahuje predikat ' + predicateName);
        }
        this.predicates.set(predicateName, arity);
    }

    hasConstant(constantName) {
        return this.constants.has(constantName);
    }

    hasFunction(functionName) {
        return this.functions.has(functionName);
    }

    hasPredicate(predicateName) {
        return this.predicates.has(predicateName);
    }

    deleteConstant(constantName) {
        this.constants.delete(constantName);
    }

    deleteFunction(functionName) {
        this.functions.delete(functionName);
    }

    deletePredicate(predicateName) {
        this.predicates.delete(predicateName);
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