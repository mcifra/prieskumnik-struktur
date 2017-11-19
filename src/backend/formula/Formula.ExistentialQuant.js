import Formula from "./Formula";

/**
 * Represent existential quantificator
 * @author Milan Cifra
 * @class
 * @extends Formula
 */
class ExistentialQuant extends Formula {

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
        for (var i = 0; i < structure.domain.length(); i++) {
            e.set(this.variableName, structure.domain[i]);
            if (this.subFormula.isSatisfied(structure, e)) {
                return true;
            }
        }
        return false;
    }

    toString() {
        return "E" + this.variableName + "(" + this.subFormula.toString() + ")";
    }
}

export default ExistentialQuant;