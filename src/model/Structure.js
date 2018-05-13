/**
 * Represent structure
 * @author Milan Cifra
 * @class
 */
import {EMPTY_CONSTANT_VALUE} from "../constants/messages";

class Structure {

  /**
   *
   * @param {Language} language
   */
  constructor(language) {
    this.language = language;
    this.domain = new Set();
    this.iConstant = new Map();
    this.iPredicate = new Map();
    this.iFunction = new Map();
    this.domainCombinations = new Map();
  }

  setLanguageConstants(constants) {
    let message = this.language.setConstants(constants);
    let unusedConstants = [...this.iConstant.keys()].filter(e => !this.language.hasConstant(e));
    unusedConstants.forEach(c => {
      this.iConstant.delete(c);
    });
    return message;
  }

  setLanguagePredicates(predicates) {
    let message = this.language.setPredicates(predicates);
    let unusedPredicates = [...this.iPredicate.keys()].filter(e => !this.language.hasPredicate(e));
    unusedPredicates.forEach(p => {
      this.iPredicate.delete(p);
    });
    return message;
  }

  setLanguageFunctions(functions) {
    let message = this.language.setFunctions(functions);
    let unusedFunctions = [...this.iFunction.keys()].filter(e => !this.language.hasFunction(e));
    unusedFunctions.forEach(f => {
      this.iFunction.delete(f);
    });
    this.language.functions.forEach((arity, fn) => {
      if (!this.domainCombinations.has(arity)) {
        this.domainCombinations.set(arity, []);
        this.generateDomainCombinations(arity, arity);
      }
    });
    return message;
  }

  generateDomainCombinations(arity, n, perms = []) {
    this.domain.forEach(e => {
      perms.push(e);
      if (n == 1) {
        this.domainCombinations.get(arity).push([...perms]);
      } else {
        this.generateDomainCombinations(arity, n - 1, perms);
      }
      perms.splice(-1, 1);
    });
  }

  hasDomainItem(item) {
    return this.domain.has(item);
  }

  /**
   *
   * @param {array} domain
   */
  setDomain(domain) {
    this.clearDomain();
    domain.forEach(i => {
      this.domain.add(i);
    });
    [...this.domainCombinations.keys()].forEach(arity => {
      this.domainCombinations.set(arity, []);
      this.generateDomainCombinations(arity, arity);
    });
  }

  clearDomain() {
    this.domain.clear();
  }

  /**
   *
   * @param {string} constantName
   * @param {string} value
   */
  setConstantValue(constantName, value) {
    if (!this.language.hasConstant(constantName)) {
      throw `Jazyk neobsahuje konštantu ${constantName}`;
    }
    if (!this.hasDomainItem(value)) {
      if (this.iConstant.has(constantName)) {
        this.iConstant.delete(constantName);
      }
      throw EMPTY_CONSTANT_VALUE;
    }
    this.iConstant.set(constantName, value);
  }

  /**
   *
   * @param {string} constantName
   * @returns {string | undefined}
   */
  getConstantValue(constantName) {
    return this.iConstant.get(constantName);
  }

  /**
   *
   * @param {string} predicateName
   * @param {array} tuple
   */
  setPredicateValue(predicateName, tuple) {
    let p = predicateName.split('/')[0];
    if (this.language.getPredicate(p) != tuple.length) {
      throw `N-tica ${tuple} nemá povolený počet prvkov`;
    }
    let illegalItems = tuple.filter(item => !this.domain.has(item)); // prvky ktore nie su v domene
    if (illegalItems.length > 0) {
      this.removePredicateValue(predicateName, tuple);
      throw `Prvok ${illegalItems[0]} nie je v doméne štruktúry`;
    }
    if (!this.iPredicate.has(predicateName)) {
      this.iPredicate.set(predicateName, []);
    }
    if (this.iPredicate.get(predicateName).findIndex(e => JSON.stringify(e) === JSON.stringify(tuple)) === -1) {
      this.iPredicate.get(predicateName).push(tuple);
    }
  }

  /**
   *
   * @param {string} predicateName
   * @param {array} tuple
   */
  removePredicateValue(predicateName, tuple) {
    if (!this.iPredicate.has(predicateName)) {
      return;
    }
    let index = this.iPredicate.get(predicateName).findIndex(e => JSON.stringify(e) === JSON.stringify(tuple));
    if (index > -1) {
      this.iPredicate.get(predicateName).splice(index, 1);
    }
  }

  /**
   *
   * @param {string} predicateName
   */
  getPredicateValue(predicateName) {
    return this.iPredicate.get(predicateName);
  }

  clearPredicateValue(predicateName) {
    this.iPredicate.set(predicateName, []);
  }

  /**
   * nastavi hodnotu funkcie pri textovom rezime
   * @param {string} functionName name/arity
   * @param {array} params
   * @param {string} value
   */
  setFunctionValue(functionName, params, value) {
    let fn = functionName.split('/')[0];
    let stringifiedParams = JSON.stringify(params);
    if (params.length !== this.language.getFunction(fn)) {
      throw `Počet parametrov ${params} nezodpovedá arite funkcie`;
    }
    let illegalItems = [...params, value].filter(item => !this.domain.has(item)); // prvky ktore nie su v domene
    if (illegalItems.length > 0) {
      throw `Prvok ${illegalItems[0]} nie je v doméne štruktúry`;
    }
    if (!this.iFunction.has(functionName)) {
      this.iFunction.set(functionName, {});
    }
    this.iFunction.get(functionName)[stringifiedParams] = value;
  }

  /**
   * zmeni hodnotu funkcie pri tabulkovom rezime
   * @param {string} functionName name/arity
   * @param {array} params
   * @param {string} value
   */
  changeFunctionValue(functionName, params, value) {
    if (value.length === 0) {
      this.removeFunctionValue(functionName, params);
      return;
    }
    if (!this.iFunction.has(functionName)) {
      this.iFunction.set(functionName, {});
      this.iFunction.get(functionName)[JSON.stringify(params)] = value;
      return;
    }
    this.iFunction.get(functionName)[JSON.stringify(params)] = value;
  }

  /**
   * odstrani hodnotu funkcie pri tabulkovom rezime
   * @param {string} functionName name/arity
   * @param {array} params
   */
  removeFunctionValue(functionName, params) {
    if (this.iFunction.has(functionName) && this.iFunction.get(functionName).hasOwnProperty(JSON.stringify(params))) {
      delete this.iFunction.get(functionName)[JSON.stringify(params)];
    }
  }

  /**
   * vrati hodnotu funkcie
   * @param {string} functionName
   * @param {Array} functionParams
   * @return {Object}
   */
  getFunctionValue(functionName, functionParams = null) {
    if (!this.iFunction.has(functionName)) {
      return null;
    }
    if (functionParams) {
      return this.iFunction.get(functionName)[JSON.stringify(functionParams)];
    }
    return this.iFunction.get(functionName);
  }

  getFunctionValueArray(functionName) {
    let res = [];
    let values = this.iFunction.get(functionName);
    if (!values) {
      return res;
    }
    for (let key in values) {
      if (!values.hasOwnProperty(key)) {
        continue;
      }
      let tuple = JSON.parse(key);
      tuple.push(values[key]);
      res.push(tuple);
    }
    return res;
  }

  clearFunctionValue(functionName) {
    if (this.iFunction.has(functionName)) {
      this.iFunction.set(functionName, {});
    }
  }

}

export default Structure;