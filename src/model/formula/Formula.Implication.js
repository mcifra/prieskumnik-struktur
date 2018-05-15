import Formula from "./Formula";

/**
 * Represent implication
 * @author Milan Cifra
 * @class
 * @extends Formula
 */
class Implication extends Formula {

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
   * @param {Map} e
   * @return {boolean}
   */
  eval(structure, e) {
    return (!this.subLeft.eval(structure, e)) || this.subRight.eval(structure, e);
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    return `(${this.subLeft.toString()}) → (${this.subRight.toString()})`;
  }

}

export default Implication;