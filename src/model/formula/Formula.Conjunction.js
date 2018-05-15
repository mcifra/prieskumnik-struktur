import Formula from "./Formula";

/**
 * Represent conjunction
 * @author Milan Cifra
 * @class
 * @extends Formula
 */
class Conjunction extends Formula {

  /**
   *
   * @param {Formula} subLeft
   * @param {Formula} subRight
   */
  constructor(subLeft, subRight) {
    super();
    this.subLeft = subLeft;
    this.subRight = subRight;
  }

  /**
   *
   * @param {Structure} structure
   * @param {Map} e variables valuation
   * @return {boolean}
   */
  eval(structure, e) {
    return this.subLeft.eval(structure, e) && this.subRight.eval(structure, e);
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    return `(${this.subLeft.toString()}) ∧ (${this.subRight.toString()})`;
  }

}

export default Conjunction;