import Term from "./Term";

/**
 * Variable
 * @author Milan Cifra
 * @class
 * @extends Term
 */
class Variable extends Term {

    /**
     *
     * @param {string} name Name of variable
     */
    constructor(name) {
        super();
        this.name = name;
    }

    /**
     * Return intepretation of variable.
     * @param {Structure} structure
     * @param {Map} e
     * @return {string}
     */
    interpret(structure, e) {
        return e.get(this.name);
    }

    toString() {
        return this.name;
    }
}

export default Variable;