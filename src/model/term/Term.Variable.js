import Term from "./Term";

/**
 * Variable
 * @author Milan Cifra
 * @class
 * @extends Term
 */
class Variable extends Term {

  /**
   *
   * @param {string} name Name of variable
   */
  constructor(name) {
    super();
    this.name = name;
  }

  /**
   * Return intepretation of variable.
   * @param {Structure} structure
   * @param {Map} e
   * @return {string}
   */
  eval(structure, e) {
    if (!e.has(this.name)) {
      // hodnota nie je definovana
      throw 'Hodnota premennej ' + this.name + ' nie je definovaná';
    }
    return e.get(this.name);
  }

  toString() {
    return this.name;
  }
}

export default Variable;