import Term from "./Term";

/**
 * Constant
 * @author Milan Cifra
 * @class
 * @extends Term
 */
class Constant extends Term {

    /**
     *
     * @param {string} name Name of the constant
     */
    constructor(name) {
        super();
        this.name = name;
    }

    /**
     * Return intepretation of the constant
     * @param {Structure} structure Structure
     * @param {Map} e
     * @return {string} Name of variable
     */
    interpret(structure, e) {
        return structure.getConstantValue(this.name);
    }

    toString() {
        return this.name;
    }

}

export default Constant;