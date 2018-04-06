import Term from "./Term";

/**
 * Represent function term
 * @author Milan Cifra
 * @class
 * @extends Term
 */
class FunctionTerm extends Term {

    /**
     *
     * @param {string} name Name of the function
     * @param {Term[]} terms terms (parameters)
     */
    constructor(name, terms) {
        super();
        this.name = name;
        this.terms = terms;
    }

    /**
     * Return intepretation of function.
     * @param {Structure} structure Structure
     * @param {Map} e
     * @returns {string} Name of variable
     */
    eval(structure, e) {
        var interpretedParams = [];
        for (var i = 0; i < this.terms.length; i++) {
            interpretedParams.push(this.terms[i].eval(structure, e));
        }
        return structure.getFunctionValue(this.name, interpretedParams);
    }

    toString() {
        var res = this.name + "(";
        for (var i = 0; i < this.terms.length; i++) {
            if (i > 0) {
                res += ", ";
            }
            res += this.terms[i].toString();
        }
        res += ")";
        return res;
    }

}

export default FunctionTerm;