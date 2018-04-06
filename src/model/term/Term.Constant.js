import Term from "./Term";

/**
 * Constant
 * @author Milan Cifra
 * @class
 * @extends Term
 */
class Constant extends Term {

    /**
     *
     * @param {string} name Name of the constant
     */
    constructor(name) {
        super();
        this.name = name;
    }

    /**
     * Return intepretation of the constant
     * @param {Structure} structure Structure
     * @param {Map} e
     * @return {string} Name of variable
     */
    eval(structure, e) {
        if (!structure.getConstantValue(this.name)) {
            // hodnota nie je definovana
            throw 'Hodnota konštanty ' + this.name + ' nie je definovaná';
        }
        return structure.getConstantValue(this.name);
    }

    toString() {
        return this.name;
    }

}

export default Constant;