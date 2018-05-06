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
//
// var l = new Language();
// l.addConstant("C1");
// l.addConstant("C2");
// l.addFunction("mother", 1);
// l.addPredicate("likes", 2);
// l.addPredicate("hates", 2);
//
// var e = new Map();
// e.set("x", "b");
// e.set("y", "c");
//
// var s = new Structure(l);
// s.addDomainItem("a");
// s.addDomainItem("b");
// s.addDomainItem("c");
// s.setConstantValue("C1", "a");
// s.setConstantValue("C2", "b");
// s.setConstantValue("C3", "c");
// s.setPredicateValue("likes", [ ["a", "a"], ["b", "a"], ["c", "a"], ["b", "b"] ]);
// s.setPredicateValue("hates", [ ["c", "a"] ]);
// s.setFunctionValue("mother", ["a"], "b");
// s.setFunctionValue("mother", ["c"], "a");
//
// var c1 = new Constant("C1");
// var c2 = new Constant("C2");
// var c3 = new Constant("C3");
// var v1 = new Variable("x");
// var v2 = new Variable("y");
// // mother(C1)
// var f1 = new FunctionAtom("mother", [c1]);
// // likes(mother(C1), x)
// var p1 = new PredicateSymbol("likes", [f1, v1]);
// // hates(C2, y)
// var p2 = new PredicateSymbol("hates", [c2, v2]);
//
// var con1 = new Conjunction(p1, new Negation(p2));
// var dis1 = new Disjunction(p1, p2);
// var imp1 = new Implication(p1, p2);
//
// // Vx(likes(x, C1)
// var p3 = new PredicateSymbol("likes", [v1, c1]);
// var uni1 = new UniversalQuant("x", p3);
//
// // Vx(likes(x, C2)
// var p4 = new PredicateSymbol("likes", [v1, c2]);
// var uni2 = new UniversalQuant("x", p4);
//
// // Ex(likes(x, C1)
// var exi1 = new ExistentialQuant("x", p3);
//
// // Ex(likes(x, C3)
// var p5 = new PredicateSymbol("likes", [v1, c3]);
// var exi2 = new ExistentialQuant("x", p5);
//
// var parserOptions = {
//     language: l,
//     conjunction: Conjunction,
//     disjunction: Disjunction,
//     implication: Implication,
//     variable: Variable,
//     constant: Constant,
//     existentialQuant: ExistentialQuant,
//     universalQuant: UniversalQuant,
//     functionTerm: FunctionAtom,
//     predicate: PredicateSymbol,
//     negation: Negation,
//     equalityAtom: EqualityAtom
// };

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
  s.setPredicateValue('p/3', [['1', '2', '3']]);
  let e = new Map();
  let formula = '∀x ∀y (p(x,y,x) -> x = y)';
  let parsed = parser.parse(formula, setParserOptions(s));
  expect(parsed.eval(s, e)).toBe(true);
});
//
// test("t1", () => {
//     expect(con1.toString()).toBe("(likes(mother(C1), x) && -(hates(C2, y)))");
// });
//
// test('t1-p', ()=>{
//    expect(JSON.stringify(parser.parse(con1.toString(), parserOptions))).toBe(JSON.stringify(con1));
// });
// test("t2", () => {
//     expect(con1.isSatisfied(s, e)).toBe(true);
// });
//
// test("t3", () => {
//     expect(dis1.toString()).toBe("(likes(mother(C1), x) || hates(C2, y))");
// });
// test('t3-p', ()=>{
//     expect(JSON.stringify(parser.parse(dis1.toString(), parserOptions))).toBe(JSON.stringify(dis1));
// });
// test("t4", () => {
//     expect(dis1.isSatisfied(s, e)).toBe(true);
// });
//
// test("t5", () => {
//     expect(imp1.toString()).toBe("(likes(mother(C1), x) -> hates(C2, y))");
// });
// test('t5-p', ()=>{
//     expect(JSON.stringify(parser.parse(imp1.toString(), parserOptions))).toBe(JSON.stringify(imp1));
// });
// test("t6", () => {
//     expect(imp1.isSatisfied(s, e)).toBe(false);
// });
//
// test("t7", () => {
//     expect(uni1.isSatisfied(s, e)).toBe(true);
// });
//
// test("t8", () => {
//     expect(uni2.isSatisfied(s, e)).toBe(false);
// });
//
// test("t9", () => {
//     expect(exi1.isSatisfied(s, e)).toBe(true);
// });
//
// test("t10", () => {
//     expect(exi2.isSatisfied(s, e)).toBe(false);
// });
