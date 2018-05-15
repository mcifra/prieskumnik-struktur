import Term from "./Term";

/**
 * Represent function term
 * @author Milan Cifra
 * @class
 * @extends Term
 */
class FunctionTerm extends Term {

  /**
   *
   * @param {string} name name of the function
   * @param {Term[]} terms parameters of function
   */
  constructor(name, terms) {
    super();
    this.name = name;
    this.terms = terms;
  }

  /**
   * Return intepretation of function.
   * @param {Structure} structure
   * @param {Map} e variables valuation
   * @returns {string} domain item
   */
  eval(structure, e) {
    let interpretedParams = [];
    this.terms.forEach(term => {
      interpretedParams.push(term.eval(structure, e));
    });
    if (!structure.getFunctionValue(this.name + '/' + structure.language.getFunction(this.name), interpretedParams)) {
      throw `Hodnota funkčného symbolu ${this.name}(${interpretedParams}) nie je definovaná`;
    }
    return structure.getFunctionValue(this.name + '/' + structure.language.getFunction(this.name), interpretedParams);
  }

  /**
   * Return string representation of function term
   * @returns {string}
   */
  toString() {
    let res = this.name + '(';
    for (let i = 0; i < this.terms.length; i++) {
      if (i > 0) {
        res += ', ';
      }
      res += this.terms[i].toString();
    }
    res += ')';
    return res;
  }

}

export default FunctionTerm;