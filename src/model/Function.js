class Function {
    constructor(name, terms) {
        this.name = name;
        this.terms = terms;
    }

    /**
     *
     * @param {Map} iFunction
     */
    interpretAs(i) {
        this.i = i;
    }

    interpret(e) {
        var interpretedParams = [];
        for (var i = 0; i < this.terms.length; i++) {
            interpretedParams.push(this.terms[i].interpret(e));
        }
        return this.i.get(interpretedParams);
    }
}

export default Function;