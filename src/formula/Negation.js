class Negation {
    constructor(subFormula) {
        this.subFormula = subFormula;
    }
    isSatisfied(model, e) {
        return -this.subFormula.isSatisfied(model ,e);
    }
}

export default Negation;