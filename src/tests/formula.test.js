import Language from "../model/Language";
import Structure from "../model/Structure";
import Conjunction from "../model/formula/Formula.Conjunction";
import Constant from "../model/term/Term.Constant";
import FunctionAtom from "../model/term/Term.FunctionTerm";
import PredicateSymbol from "../model/formula/Formula.PredicateAtom";
import Variable from "../model/term/Term.Variable";
import Negation from "../model/formula/Formula.Negation";
import Disjunction from "../model/formula/Formula.Disjunction";
import Implication from "../model/formula/Formula.Implication";
import UniversalQuant from "../model/formula/Formula.UniversalQuant";
import ExistentialQuant from "../model/formula/Formula.ExistentialQuant";
import EqualityAtom from "../model/formula/Formula.EqualityAtom";

let parser = require('../parser/grammar');

const setParserOptions = (s) => ({
  structure: s,
  conjunction: Conjunction,
  disjunction: Disjunction,
  implication: Implication,
  variable: Variable,
  constant: Constant,
  existentialQuant: ExistentialQuant,
  universalQuant: UniversalQuant,
  functionTerm: FunctionAtom,
  predicate: PredicateSymbol,
  negation: Negation,
  equalityAtom: EqualityAtom
});

test("∀x ∀y (p(x,y,x) -> x = y)", () => {
  let s = new Structure(new Language());
  s.setDomain(['1', '2', '3']);
  s.setLanguagePredicates([{name: 'p', arity: 3}]);
  //console.log(s.language.getPredicate('p'));
  s.setPredicateValue('p/3', ['1', '2', '3']);
  let e = new Map();
  let formula = '∀x ∀y (p(x,y,x) -> x = y)';
  let parsed = parser.parse(formula, setParserOptions(s));
  expect(parsed.eval(s, e)).toBe(true);
});
