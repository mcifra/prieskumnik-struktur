import Term from "./Term";

class Constant extends Term {

    constructor(name) {
        super();
        this.name = name;
    }

    interpret(structure, e) {
        return structure.iConstant.get(this.name);
    }

}

export default Constant;