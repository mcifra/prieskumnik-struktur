class EqualitySymbol {
    constructor(subLeft, subRight) {
        this.subLeft = subLeft;
        this.subRight = subRight;
    }

    isSatisfied(e) {
        return this.subLeft.translate(e) == this.subRight.translate(e);
    }

}

export default EqualitySymbol;