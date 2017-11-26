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

    addDomainItem(name) {
        this.domain.add(name);
    }

    deleteDomainItem(name) {
        this.domain.delete(name);
    }

    setConstantValue(constantName, value) {
        this.addDomainItem(value);
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
        for (var i = 0; i < predicateParams.length; i++) {
            if (predicateParams[i].length !== this.language.getPredicate(predicateName)) {
                throw "Arita predikatu sa nerovna poctu parametrov";
            }
        }
        this.iPredicate.set(predicateName, predicateParams);
        for (var i = 0; i < predicateParams.length; i++) {
            for (var j = 0; j < predicateParams[i].length; j++) {
                this.addDomainItem(predicateParams[i][j]);
            }
        }
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
        if (functionParams.length !== this.language.getFunction(functionName)) {
            throw "Arita funkcie sa nerovna poctu parametrov";
        }
        if (!this.iFunction.has(functionName)) {
            this.iFunction.set(functionName, new Map());
        }
        this.iFunction.get(functionName).set(JSON.stringify(functionParams), value);
    }

    /**
     *
     * @param {string} functionName
     * @param {Array} functionParams
     * @return {string|undefined}
     */
    getFunctionValue(functionName, functionParams) {
        var functionValue = this.iFunction.get(functionName);
        return functionValue.get(JSON.stringify(functionParams));
    }


}

export default Structure;