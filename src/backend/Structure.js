/**
 * Represent structure
 * @author Milan Cifra
 * @class
 */
import InvalidLanguageException from "../exceptions/InvalidLanguageException";

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
        this.language.setConstants(constants);
    }

    setLanguagePredicates(predicates) {
        this.language.setPredicates(predicates);
    }

    setLanguageFunctions(functions) {
        this.language.setFunctions(functions);
    }

    hasDomainItem(name) {
        return this.domain.has(name);
    }

    setDomain(domain) {
        this.domain = domain;
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
        if (!this.language.hasConstant(constantName)) {
            throw new InvalidLanguageException('Jazyk neobsahuje konštantu ' + constantName);
        }
        if (value === '' || value == null || value === undefined) {
            throw new InvalidLanguageException('Hodnota konštanty nesmie byť prázdna');
        }
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
        if (this.iFunction.get(functionName) == null)
            this.iFunction.set(functionName, new Map());
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