import Formula from "./Formula";

class PredicateSymbol extends Formula {

    constructor(info, terms = []) {
        super();
        this.info = info;
        if (terms.length > 0 && info.arity === terms.length) {
            this.terms = terms;
        } else {
            throw 'arity not equals terms length';
        }
    }

    isSatisfied(structure, e) {
        var translatedTerms = [];

        for (let term in this.terms) {
            translatedTerms.push(term.interpret(structure, e));
        }

        var i = structure.iPredicate.get(this.info.name);

        var iJSON = JSON.stringify(i);
        var translatedTermsJSON = JSON.stringify(translatedTerms);

        return iJSON.indexOf(translatedTermsJSON) > -1;

    }

}

export default PredicateSymbol;