class PredicateSymbol {

    constructor(name, arity, terms = []) {
        this.name = name;
        this.arity = arity;
        if (terms.length > 0 && arity == terms.length) {
            this.terms = terms;
        } else {
            throw 'arity not equals terms length';
        }
    }

    interpretatAs(i) {
        // pole ntic dlzky {arity}
        this.i = i;
    }

    isSatisfied(e) {
        var translatedTerms = []; // pole prvkov {ModelItem}

        for (var i = 0; i < this.terms.length; i++) {
            //console.log(this.terms[i]);
            translatedTerms.push(this.terms[i].interpret(e));
        }

        var iJSON = JSON.stringify(this.i);
        var translatedTermsJSON = JSON.stringify(translatedTerms);

        // ntica je v i funkcii alebo nie
        return iJSON.indexOf(translatedTermsJSON) > -1;

    }

}

export default PredicateSymbol;