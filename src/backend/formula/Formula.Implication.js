import Formula from "./Formula";

class Implication extends Formula {

    constructor(subLeft, subRight) {
        super();
        this.subLeft = subLeft;
        this.subRight = subRight;
    }

    isSatisfied(structure, e) {
        return (-this.subLeft.isSatisfied(structure, e)) || this.subRight.isSatisfied(structure, e);
    }

}

export default Implication;