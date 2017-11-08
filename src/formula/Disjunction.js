class Disjunction {
    constructor(subLeft, subRight) {
        this.subLeft = subLeft;
        this.subRight = subRight;
    }
    isSatisfied(e) {
        return this.subLeft.isSatisfied(e) || this.subRight.isSatisfied(e);
    }
}

export default Disjunction;