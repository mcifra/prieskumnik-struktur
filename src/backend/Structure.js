/**
 * Represent structure
 * @author Milan Cifra
 * @class
 */
class Structure {

    /**
     *
     * @param {Language} language
     */
    constructor(language) {
        this.language = language;
        this.domain = new Set();
        this.iConstant = new Map();
        this.iPredicate = new Map();
        this.iFunction = new Map();
    }

    setLanguageConstants(constants) {
        let cons = new Set();
        for (let i = 0; i < constants.length; i++) {
            if (this.language.hasItem(constants[i]) || cons.has(constants[i]) || this.domain.has(constants[i]))
                throw "Struktura uz obsahuje prvok " + constants[i];
            cons.add(constants[i]);
        }
        this.language.setConstants(cons);
    }

    setLanguagePredicates(predicates) {
        let predic = new Map();
        for (let i = 0; i < predicates.length; i++) {
            if (this.language.hasItem(predicates[i].name) || this.domain.has(predicates[i].name))
                throw "Struktura uz obsahuje prvok " + predicates[i].name;
            predic.set(predicates[i].name, predicates[i].arity);
        }
        this.language.setPredicates(predic);
    }

    setLanguageFunctions(functions) {
        let func = new Map();
        for (let i = 0; i < functions.length; i++) {
            if (this.language.hasItem(functions[i].name) || this.domain.has(functions[i].name))
                throw "Struktura uz obsahuje prvok " + functions[i].name;
            func.set(functions[i].name, functions[i].arity);
        }
        this.language.setFunctions(func);
    }

    hasDomainItem(name) {
        return this.domain.has(name);
    }

    setDomain(domain) {
        let d = new Set();
        for (let i = 0; i < domain.length; i++) {
            if (this.language.hasItem(domain[i]) || d.has(domain[i]))
                throw "Struktura uz obsahuje prvok " + domain[i];
            d.add(domain[i]);
        }
        this.domain = d;
    }

    clearDomain() {
        this.domain.clear();
    }

    addDomainItem(name) {
        this.domain.add(name);
    }

    deleteDomainItem(name) {
        this.domain.delete(name);
    }

    setConstantValue(constantName, value) {
        this.iConstant.set(constantName, value);
    }

    getConstantValue(constantName) {
        return this.iConstant.get(constantName);
    }

    /**
     *
     * @param {string} predicateName
     * @param {Array} predicateParams
     */
    setPredicateValue(predicateName, predicateParams) {
        this.iPredicate.set(predicateName, predicateParams);
    }

    /**
     *
     * @param {string} predicateName
     * @return {Array} array of tuples
     */
    getPredicateValue(predicateName) {
        return this.iPredicate.get(predicateName);
    }

    /**
     *
     * @param {string} functionName
     * @param {Array} functionParams
     * @param {string} value
     */
    setFunctionValue(functionName, functionParams, value) {
        this.iFunction.get(functionName).set(JSON.stringify(functionParams), value);
    }

    /**
     *
     * @param {string} functionName
     * @param {Array} functionParams
     * @return {string|undefined}
     */
    getFunctionValue(functionName, functionParams) {
        let functionValue = this.iFunction.get(functionName);
        return functionValue.get(JSON.stringify(functionParams));
    }

}

export default Structure;