import Expression from "../Expression";

/**
 * Represent simple formula
 * @author Milan Cifra
 * @class
 * @abstract
 * @extends Expression
 */
class Formula extends Expression {

  constructor() {
    super();
  }

  toString() {
    return '';
  }

}

export default Formula;