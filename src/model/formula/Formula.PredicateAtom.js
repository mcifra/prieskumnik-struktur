import Formula from "./Formula";

/**
 * Represent predicate symbol
 * @author Milan Cifra
 * @class
 * @extends Formula
 */
class PredicateAtom extends Formula {

  /**
   *
   * @param {string} name
   * @param {Term[]} terms
   */
  constructor(name, terms = []) {
    super();
    this.name = name;
    this.terms = terms;
  }

  /**
   *
   * @param {Structure} structure
   * @param {Map} e
   * @return {boolean}
   */
  eval(structure, e) {
    let translatedTerms = [];
    this.terms.forEach(term => {
      translatedTerms.push(term.eval(structure, e));
    });
    let arity = structure.language.getPredicate(this.name);
    if (!structure.getPredicateValue(this.name + '/' + arity)) {
      return false;
    }
    let value = structure.getPredicateValue(this.name + '/' + arity);
    return value.findIndex(e => JSON.stringify(e) === JSON.stringify(translatedTerms)) > -1;
  }

  /**
   *
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

export default PredicateAtom;