class Variable {

    constructor(name) {
        this.name = name;
    }

    interpret(e) {
        // return {ModelItem}
        return e.get(this);
    }
}

export default Variable;