import Formula from "./Formula";

/**
 * Represent universal quantificator
 * @author Milan Cifra
 * @class
 * @extends Formula
 */
class UniversalQuant extends Formula {

    /**
     *
     * @param {string} variableName
     * @param {Formula} subFormula
     */
    constructor(variableName, subFormula) {
        super();
        this.variableName = variableName;
        this.subFormula = subFormula;
    }

    /**
     *
     * @param {Structure} structure
     * @param {Map} e
     * @return {boolean}
     */
    isSatisfied(structure, e) {
        var eCopy = new Map(e);
        for (let item of structure.domain) {
            eCopy.set(this.variableName, item);
            if (!this.subFormula.isSatisfied(structure, eCopy)) {
                return false;
            }
        }
        return true;
    }

    toString() {
        return "V" + this.variableName + "(" + this.subFormula.toString() + ")";
    }

}

export default UniversalQuant;