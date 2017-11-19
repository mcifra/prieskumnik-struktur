import Formula from "./Formula";

/**
 * Represent predicate symbol
 * @author Milan Cifra
 * @class
 * @extends Formula
 */
class PredicateSymbol extends Formula {

    /**
     *
     * @param {string} name
     * @param {Array} terms
     */
    constructor(name, terms = []) {
        super();
        this.name = name;
        this.terms = terms;
    }

    /**
     *
     * @param {Structure} structure
     * @param {Map} e
     * @return {boolean}
     */
    isSatisfied(structure, e) {
        var translatedTerms = [];
        for (var i = 0; i < this.terms.length; i++) {
            translatedTerms.push(this.terms[i].interpret(structure, e));
        }
        var allTerms = structure.getPredicateValue(this.name);

        return JSON.stringify(allTerms).indexOf(JSON.stringify(translatedTerms)) > -1;
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

export default PredicateSymbol;