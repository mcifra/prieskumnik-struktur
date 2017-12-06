import Expression from "../Expression";

/**
 * Represent simple term.
 * @author Milan Cifra
 * @class
 * @abstract
 *
 */
class Term extends Expression {

    constructor() {
        super();
    }

    /**
     * Abstract method
     * @param {Structure} structure
     * @param {Map} e
     * @returns {null}
     */
    interpret(structure, e) {
        return null;
    }

    toString() {
        return null;
    }

}

export default Term;