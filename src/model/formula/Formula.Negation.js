import Formula from "./Formula";

/**
 * Represent negation
 * @author Milan Cifra
 * @class
 * @extends Formula
 */
class Negation extends Formula {

  /**
   *
   * @param {Formula} subFormula
   */
  constructor(subFormula) {
    super();
    this.subFormula = subFormula;
  }

  /**
   *
   * @param {Structure} structure
   * @param {Map} e
   * @return {boolean}
   */
  eval(structure, e) {
    return !this.subFormula.eval(structure, e);
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    return `¬(${this.subFormula.toString()})`;
  }

}

export default Negation;