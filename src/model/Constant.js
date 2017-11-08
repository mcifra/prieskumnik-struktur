class Constant {
    constructor(name) {
        this.name = name;
    }

    /**
     *
     * @param {ModelItem} i
     */
    interpretAs(i) {
        this.i = i;
    }

    interpret(e) {
        return this.i;
    }

}

export default Constant;