class Implication {
    constructor(subLeft, subRight) {
        this.subLeft = subLeft;
        this.subRight = subRight;
    }
    isSatisfied(model, e) {
        return (-this.subLeft.isSatisfied(model, e)) || this.subRight.isSatisfied(model, e);
    }
}

export default Implication;