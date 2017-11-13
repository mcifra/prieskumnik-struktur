import Term from "./Term";

class Function extends Term {

    constructor(info, terms) {
        super();
        this.info = info;
        this.terms = terms;
    }

    interpret(structure, e) {
        var interpretedParams = [];
        for (var i = 0; i < this.terms.length; i++) {
            interpretedParams.push(this.terms[i].interpret(structure, e));
        }
        return structure.iFunction.get(this.info.name).get(JSON.stringify(interpretedParams));
    }
}

export default Function;