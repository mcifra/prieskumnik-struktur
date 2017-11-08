class ExistentialQuant {
    constructor(variableName, subFormula) {
        this.variableName = variableName;
        this.subFormula = subFormula;
    }

    /**
     *
     * @param {array} model
     * @param {Map} e
     */
    isSatisfied(model, e) {
        for (var i = 0; i < model.length(); i++) {
            e.set(this.variableName, model[i]);
            if (this.subFormula.isSatisfied(model, e)) {
                return true;
            }
        }
        return false;
    }
}

export default ExistentialQuant;