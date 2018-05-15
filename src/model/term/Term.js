import Expression from "../Expression";

/**
 * Represent simple term.
 * @author Milan Cifra
 * @class
 * @abstract
 *
 */
class Term extends Expression {

  constructor() {
    super();
  }

  toString() {
    return '';
  }

}

export default Term;