import Formula from "./Formula";

class EqualitySymbol extends Formula {

    constructor(subLeft, subRight) {
        super();
        this.subLeft = subLeft;
        this.subRight = subRight;
    }

    isSatisfied(e) {
        return this.subLeft.translate(e) == this.subRight.translate(e);
    }

}

export default EqualitySymbol;