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
     * @param structure Structure
     * @param structure.domain Structure domain
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