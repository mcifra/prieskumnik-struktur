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
        return this.language.setConstants(constants);
        // let iConstantKeys = [...this.iConstant.keys()];
        // iConstantKeys.forEach(constantName => {
        //     if (!this.language.hasConstant(constantName))
        //         this.iConstant.delete(constantName);
        // });
    }

    setLanguagePredicates(predicates) {
        return this.language.setPredicates(predicates);
        // let iPredicateKeys = [...this.iPredicate.keys()];
        // iPredicateKeys.forEach(predicateName => {
        //     if (!this.language.hasPredicate(predicateName))
        //         this.iPredicate.delete(predicateName);
        // });
    }

    setLanguageFunctions(functions) {
        return this.language.setFunctions(functions);
        // let iFunctionKeys = [...this.iFunction.keys()];
        // iFunctionKeys.forEach(functionName => {
        //     if (!this.language.hasFunction(functionName))
        //         this.iFunction.delete(functionName);
        // });
    }

    hasDomainItem(item) {
        return this.domain.has(item);
    }

    setDomain(domain) {
        if (domain.constructor === Set)
            this.domain = domain;
        else
            this.domain = new Set(domain)
        return '';
    }

    clearDomain() {
        this.domain.clear();
    }

    // addDomainItem(name) {
    //     this.domain.add(name);
    // }
    //
    // deleteDomainItem(name) {
    //     this.domain.delete(name);
    // }

    setConstantValue(constantName, value) {
        if (!this.language.hasConstant(constantName)) {
            throw new InvalidLanguageException('Jazyk neobsahuje konštantu ' + constantName);
        }
        if (value === '' || value == null || value === undefined) {
            throw new InvalidLanguageException('Interpretačná hodnota konštanty nesmie byť prázdna');
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
        if (!this.language.hasPredicate(predicateName)) {
            //throw new InvalidLanguageException('Jazyk neobsahuje predikátový symbol ' + predicateName);
            console.log('nie je v jazyku');
            return;
        }
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
        if (!this.language.hasFunction(functionName)) {
            throw new InvalidLanguageException('Jazyk neobsahuje funkčný symbol ' + functionName);
        }
        let stringified = JSON.stringify(functionParams);
        if (!this.iFunction.has(functionName)) {
            this.iFunction.set(functionName, new Map());
        }
        if (value.length === 0)
            this.iFunction.get(functionName).delete(stringified);
        else
            this.iFunction.get(functionName).set(stringified, value);
    }

    /**
     *
     * @param {string} functionName
     * @param {Array} functionParams
     * @return {string|null}
     */
    getFunctionValue(functionName, functionParams = null) {
        if (functionParams) {
            if (!this.iFunction.has(functionName))
                return null;
            return this.iFunction.get(functionName).get(JSON.stringify(functionParams));
        }
        return this.iFunction.get(functionName);
    }

}

export default Structure;