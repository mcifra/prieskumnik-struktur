import Formula from "./Formula";

/**
 * Represent disjunction
 * @author Milan Cifra
 * @class
 * @extends Formula
 */
class Disjunction extends Formula {

    /**
     *
     * @param {Formula} subLeft
     * @param {Formula} subRight
     */
    constructor(subLeft, subRight) {
        super();
        this.subLeft = subLeft;
        this.subRight = subRight;
    }

    /**
     *
     * @param {Structure} structure
     * @param {Map} e
     * @return {boolean}
     */
    isSatisfied(structure, e) {
        return this.subLeft.isSatisfied(structure, e) || this.subRight.isSatisfied(structure, e);
    }

    toString() {
        return "(" + this.subLeft.toString() + " || " + this.subRight.toString() + ")";
    }
}

export default Disjunction;