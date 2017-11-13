import Formula from "./Formula";

class UniversalQuant extends Formula {

    constructor(variableName, subFormula) {
        super();
        this.variableName = variableName;
        this.subFormula = subFormula;
    }

    isSatisfied(structure, e) {
        for (var i = 0; i < structure.domain.length(); i++) {
            e.set(this.variableName, structure.domain[i]);
            if (!this.subFormula.isSatisfied(structure, e)) {
                return false;
            }
        }
        return true;
    }
}

export default UniversalQuant;