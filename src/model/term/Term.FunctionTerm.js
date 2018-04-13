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
    * @param {string} name Name of the function
    * @param {Term[]} terms terms (parameters)
    */
   constructor(name, terms) {
      super();
      this.name = name;
      this.terms = terms;
   }

   /**
    * Return intepretation of function.
    * @param {Structure} structure Structure
    * @param {Map} e
    * @returns {string} Name of variable
    */
   eval(structure, e) {
      let interpretedParams = [];
      this.terms.forEach(term => {
         interpretedParams.push(term.eval(structure, e));
      });
      if (!structure.getFunctionValue(this.name + '/' + structure.language.getFunction(this.name), interpretedParams)) {
         // hodnota nie je definovana
         throw 'Hodnota funkčného symbolu ' + this.name + ' nie je definovaná';
      }
      return structure.getFunctionValue(this.name + '/' + structure.language.getFunction(this.name), interpretedParams);
   }

   toString() {
      var res = this.name + "(";
      for (var i = 0; i < this.terms.length; i++) {
         if (i > 0) {
            res += ", ";
         }
         res += this.terms[i].toString();
      }
      res += ")";
      return res;
   }

}

export default FunctionTerm;