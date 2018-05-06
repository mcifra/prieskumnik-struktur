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

  setFunctionValue(functionName, tuple) {
    let p = functionName.split('/')[0];
    if (tuple.length !== this.language.getFunction(p) + 1) {
      throw 'N-tica ' + tuple + ' nemá povolený počet prvkov';
    }
    let params = tuple.slice(0, tuple.length - 1);
    if (this.iFunction.has(functionName) && this.iFunction.get(functionName).has(JSON.stringify(params))) {
      if (params.length === 1) {
        throw `Funkcia už je definovaná pre argument ${params}`;
      } else {
        throw `Funkcia už je definovaná pre argumenty ${params}`;
      }
    }
    let value = tuple[tuple.length - 1];
    if (!value) {
      // vyuzitie pri tabulke
      this.removeFunctionValue(functionName, params);
      return;
    }
    let illegalItems = tuple.filter(item => !this.domain.has(item)); // prvky ktore nie su v domene
    if (illegalItems.length > 0) {
      throw 'Prvok ' + illegalItems[0] + ' nie je v doméne štruktúry';
    }
    if (!this.iFunction.has(functionName)) {
      this.iFunction.set(functionName, new Map());
    }
    this.iFunction.get(functionName).set(JSON.stringify(params), value);
  }

  removeFunctionValue(functionName, tuple) {
    let m = this.iFunction.get(functionName);
    if (m)
      m.delete(JSON.stringify(tuple));
  }

  /**
   *
   * @param {string} functionName
   * @param {Array} functionParams
   * @return {string|null}
   */
  getFunctionValue(functionName, functionParams = null) {
    if (functionParams) {
      if (!this.iFunction.has(functionName))
        return null;
      return this.iFunction.get(functionName).get(JSON.stringify(functionParams));
    }
    return this.iFunction.get(functionName);
  }

  getFunctionValueArray(functionName) {
    if (!this.iFunction.has(functionName) || !this.iFunction.get(functionName))
      return [];
    let res = [];
    this.iFunction.get(functionName).forEach((value, params) => {
      let tuple = JSON.parse(params);
      tuple.push(value);
      res.push(tuple);
    });
    return res;
  }

  clearFunctionValue(functionName) {
    if (this.iFunction.has(functionName))
      this.iFunction.get(functionName).clear();
  }

}

export default Structure;