import Term from "./Term";

class Variable extends Term {

    constructor(name) {
        super();
        this.name = name;
    }

    interpret(e) {
        return e.get(this);
    }
}

export default Variable;