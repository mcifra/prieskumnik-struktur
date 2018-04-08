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
        let message = this.language.setConstants(constants);
        let unusedConstants = [...this.iConstant.keys()].filter(e => !this.language.hasConstant(e));
        unusedConstants.forEach(c => {
            this.iConstant.delete(c);
        });
        return message;
    }

    setLanguagePredicates(predicates) {
        let message = this.language.setPredicates(predicates);
        let unusedPredicates = [...this.iPredicate.keys()].filter(e => !this.language.hasPredicate(e));
        unusedPredicates.forEach(p => {
            this.iPredicate.delete(p);
        });
        return message;
    }

    setLanguageFunctions(functions) {
        let message = this.language.setFunctions(functions);
        let unusedFunctions = [...this.iFunction.keys()].filter(e => !this.language.hasFunction(e));
        unusedFunctions.forEach(f => {
            this.iFunction.delete(f);
        });
        return message;
    }

    hasDomainItem(item) {
        return this.domain.has(item);
    }

    setDomain(domain) {
        this.domain = new Set(domain);
        return '';
    }

    clearDomain() {
        this.domain.clear();
    }

    setConstantValue(constantName, value) {
        if (!this.language.hasConstant(constantName)) {
            throw new InvalidLanguageException('Jazyk neobsahuje konštantu ' + constantName);
        }
        if (!this.domain.has(value)) {
            if (this.iConstant.has(constantName))
                this.iConstant.delete(constantName);
            throw new InvalidLanguageException('Interpretačná hodnota konštanty nesmie byť prázdna');
        }
        if (value.length === 0) {
            if (this.iConstant.has(constantName))
                this.iConstant.delete(constantName);
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
            return;
        }
        if (!this.iPredicate.has(predicateName)) {
            this.iPredicate.set(predicateName, []);
        }
        this.iPredicate.set(predicateName, predicateParams);
    }

    addPredicateValue(predicateName, tuple) {
        let p = predicateName.split('/')[0];
        if (this.language.getPredicate(p) !== tuple.length) {
            // this.removePredicateValue(predicateName, tuple);
            throw 'N-tica ' + tuple + 'nemá povolený počet prvkov';
        }
        let illegalItems = tuple.filter(item => !this.domain.has(item)); // prvky ktore nie su v domene
        if (illegalItems.length > 0) {
            this.removePredicateValue(predicateName, tuple);
            throw 'Prvok ' + illegalItems[0] + ' nie je v doméne štruktúry';
        }
        if (!this.iPredicate.has(predicateName)) {
            this.iPredicate.set(predicateName, []);
        }
        if(this.iPredicate.get(predicateName).findIndex(e => JSON.stringify(e) === JSON.stringify(tuple)) === -1) {
            this.iPredicate.get(predicateName).push(tuple);
        }
    }

    removePredicateValue(predicateName, tuple) {
        if (!this.iPredicate.has(predicateName)) {
            return;
        }
        let index = this.iPredicate.get(predicateName).findIndex(e => JSON.stringify(e) === JSON.stringify(tuple));
        if (index > -1)
            this.iPredicate.get(predicateName).splice(index, 1);
    }

    /**
     *
     * @param {string} predicateName
     * @return {Array} array of tuples
     */
    getPredicateValue(predicateName) {
        return this.iPredicate.get(predicateName);
    }

    clearPredicateValue(predicateName) {
        this.iPredicate.set(predicateName, []);
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

    addFunctionValue(functionName, tuple) {
        let p = functionName.split('/')[0];
        if (tuple.length !== this.language.getFunction(p) + 1) {
            throw 'N-tica ' + tuple + ' nemá povolený počet prvkov';
        }
        let params = tuple.slice(0, tuple.length - 1);
        let value = tuple[tuple.length - 1];
        if (!value) {
            // vyuzitie pri tabulke
            this.removeFunctionValue(functionName, params);
            return;
        }
        let illegalItems = tuple.filter(item => !this.domain.has(item)); // prvky ktore nie su v domene
        if (illegalItems.length > 0) {
            throw 'Prvok ' + illegalItems[0] + ' nie je v doméne štruktúry';
        }
        if (!this.iFunction.has(functionName)) {
            this.iFunction.set(functionName, new Map());
        }
        this.iFunction.get(functionName).set(JSON.stringify(params), value);
    }

    removeFunctionValue(functionName, tuple) {
        let m = this.iFunction.get(functionName);
        if (m)
            m.delete(JSON.stringify(tuple));
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

    getFunctionValueArray(functionName) {
        if (!this.iFunction.has(functionName) || !this.iFunction.get(functionName))
            return [];
        let res = [];
        this.iFunction.get(functionName).forEach((value, params) => {
            let tuple = JSON.parse(params);
            tuple.push(value);
            res.push(tuple);
        });
        return res;
    }

    clearFunctionValue(functionName) {
        if (this.iFunction.has(functionName))
            this.iFunction.get(functionName).clear();
    }

}

export default Structure;