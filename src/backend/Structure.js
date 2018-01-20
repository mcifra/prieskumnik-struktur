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

    hasDomainItem(name) {
        return this.domain.has(name);
    }

    setDomain(domain) {
        this.domain = new Set(domain);
    }

    clearDomain() {
        this.domain = new Set();
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