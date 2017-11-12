class Language {

    constructor(constants = new Set(), functions = new Set(), predicates = new Set()) {
        this.constants = constants;
        this.functions = functions;
        this.predicates = predicates;
    }

    addConstant(constantName) {
        this.constants.add(constantName);
    }

    addFunction(functionName, arity) {
        if (this._findFunction(functionName) === null) {
            this.functions.add({'name': functionName, 'arity': arity});
        }
    }

    addPredicate(predicateName, arity) {
        this.predicates.add({'name': predicateName, 'arity': arity});
    }

    hasConstant(constantName) {
        return this.constants.has(constantName);
    }

    hasFunction(functionName) {
        return this._findFunction(functionName) !== null;
    }

    hasPredicate(predicateName) {
        return this._findPredicate(predicateName) !== null;
    }

    deleteConstant(constantName) {
        this.constants.delete(constantName);
    }

    deleteFunction(functionName) {
        var obj = this._findFunction(functionName);
        if (obj !== null) {
            this.functions.delete(obj);
        }
    }

    deletePredicate(predicateName) {
        var obj = this._findPredicate(predicateName);
        if (obj !== null) {
            this.predicates.delete(obj);
        }
    }

    getFunction(functionName) {
        return this._findFunction(functionName);
    }

    getPredicate(predicateName) {
        return this._findPredicate(predicateName);
    }

    _findFunction(functionName) {
        for (let obj of this.functions) {
            if (obj.name === functionName) {
                return obj;
            }
        }
        return null;
    }

    _findPredicate(predicateName) {
        for (let obj of this.predicates) {
            if (obj.name === predicateName) {
                return obj;
            }
        }
        return null;
    }

}

export default Language;