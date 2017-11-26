import Formula from "./Formula";

/**
 * Represent negation
 * @author Milan Cifra
 * @class
 * @extends Formula
 */
class Negation extends Formula {

    /**
     *
     * @param {Formula} subFormula
     */
    constructor(subFormula) {
        super();
        this.subFormula = subFormula;
    }

    /**
     *
     * @param {Structure} structure
     * @param {Map} e
     * @return {boolean}
     */
    isSatisfied(structure, e) {
        return !this.subFormula.isSatisfied(structure, e);
    }

    toString() {
        return "-(" + this.subFormula.toString() + ")";
    }
}

export default Negation;