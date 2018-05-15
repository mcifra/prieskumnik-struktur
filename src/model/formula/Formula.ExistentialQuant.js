import Formula from "./Formula";

/**
 * Represent existential quantificator
 * @author Milan Cifra
 * @class
 * @extends Formula
 */
class ExistentialQuant extends Formula {

  /**
   *
   * @param {string} variableName
   * @param {Formula} subFormula
   */
  constructor(variableName, subFormula) {
    super();
    this.variableName = variableName;
    this.subFormula = subFormula;
  }

  /**
   *
   * @param {Structure} structure
   * @param {Map} e
   * @return {boolean}
   */
  eval(structure, e) {
    let eCopy = new Map(e);
    for (let item of structure.domain) {
      eCopy.set(this.variableName, item);
      if (this.subFormula.eval(structure, eCopy)) {
        return true;
      }
    }
    return false;
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    return `∃${this.variableName} (${this.subFormula.toString()})`;
  }

}

export default ExistentialQuant;