import Formula from "./Formula";

/**
 * Represent equality symbol
 * @author Milan Cifra
 * @class
 * @extends Formula
 */
class EqualityAtom extends Formula {

    /**
     *
     * @param {Term} subLeft
     * @param {Term} subRight
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
        return this.subLeft.interpret(structure, e) === this.subRight.interpret(structure, e);
    }

    toString() {
        return "(" + this.subLeft.toString() + " = " + this.subRight.toString() + ")";
    }

}

export default EqualityAtom;