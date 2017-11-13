import Formula from "./Formula";

class Disjunction extends Formula {

    constructor(subLeft, subRight) {
        super();
        this.subLeft = subLeft;
        this.subRight = subRight;
    }
    isSatisfied(structure, e) {
        return this.subLeft.isSatisfied(structure, e) || this.subRight.isSatisfied(structure, e);
    }
}

export default Disjunction;