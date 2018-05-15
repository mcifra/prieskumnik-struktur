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
   * @param {Map} e variables valuation
   * @return {string} domain item
   */
  eval(structure, e) {
    if (!structure.getConstantValue(this.name)) {
      throw `Hodnota konštanty ${this.name} nie je definovaná`;
    }
    return structure.getConstantValue(this.name);
  }

  /**
   * Return string representation of constant
   * @returns {string}
   */
  toString() {
    return this.name;
  }

}

export default Constant;