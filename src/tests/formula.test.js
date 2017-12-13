
import Language from "../backend/Language";
import Structure from "../backend/Structure";
import Conjunction from "../backend/formula/Formula.Conjunction";
import Constant from "../backend/term/Term.Constant";
import FunctionAtom from "../backend/term/Term.FunctionTerm";
import PredicateSymbol from "../backend/formula/Formula.PredicateAtom";
import Variable from "../backend/term/Term.Variable";
import Negation from "../backend/formula/Formula.Negation";
import Disjunction from "../backend/formula/Formula.Disjunction";
import Implication from "../backend/formula/Formula.Implication";
import UniversalQuant from "../backend/formula/Formula.UniversalQuant";
import ExistentialQuant from "../backend/formula/Formula.ExistentialQuant";

var l = new Language();
l.addConstant("C1");
l.addConstant("C2");
l.addFunction("mother", 1);
l.addPredicate("likes", 2);
l.addPredicate("hates", 2);

var e = new Map();
e.set("x", "b");
e.set("y", "c");

var s = new Structure(l);
s.addDomainItem("a");
s.addDomainItem("b");
s.addDomainItem("c");
s.setConstantValue("C1", "a");
s.setConstantValue("C2", "b");
s.setConstantValue("C3", "c");
s.setPredicateValue("likes", [ ["a", "a"], ["b", "a"], ["c", "a"], ["b", "b"] ]);
s.setPredicateValue("hates", [ ["c", "a"] ]);
s.setFunctionValue("mother", ["a"], "b");
s.setFunctionValue("mother", ["c"], "a");

var c1 = new Constant("C1");
var c2 = new Constant("C2");
var c3 = new Constant("C3");
var v1 = new Variable("x");
var v2 = new Variable("y");
// mother(C1)
var f1 = new FunctionAtom("mother", [c1]);
// likes(mother(C1), x)
var p1 = new PredicateSymbol("likes", [f1, v1]);
// hates(C2, y)
var p2 = new PredicateSymbol("hates", [c2, v2]);

var con1 = new Conjunction(p1, new Negation(p2));
var dis1 = new Disjunction(p1, p2);
var imp1 = new Implication(p1, p2);

// Vx(likes(x, C1)
var p3 = new PredicateSymbol("likes", [v1, c1]);
var uni1 = new UniversalQuant("x", p3);

// Vx(likes(x, C2)
var p4 = new PredicateSymbol("likes", [v1, c2]);
var uni2 = new UniversalQuant("x", p4);

// Ex(likes(x, C1)
var exi1 = new ExistentialQuant("x", p3);

// Ex(likes(x, C3)
var p5 = new PredicateSymbol("likes", [v1, c3]);
var exi2 = new ExistentialQuant("x", p5);



test("t1", () => {
    expect(con1.toString()).toBe("(likes(mother(C1), x) && -(hates(C2, y)))");
});

test("t2", () => {
    expect(con1.isSatisfied(s, e)).toBe(true);
});

test("t3", () => {
    expect(dis1.toString()).toBe("(likes(mother(C1), x) || hates(C2, y))");
});

test("t4", () => {
    expect(dis1.isSatisfied(s, e)).toBe(true);
});

test("t5", () => {
    expect(imp1.toString()).toBe("(likes(mother(C1), x) -> hates(C2, y))");
});

test("t6", () => {
    expect(imp1.isSatisfied(s, e)).toBe(false);
});

test("t7", () => {
    expect(uni1.isSatisfied(s, e)).toBe(true);
});

test("t8", () => {
    expect(uni2.isSatisfied(s, e)).toBe(false);
});

test("t9", () => {
    expect(exi1.isSatisfied(s, e)).toBe(true);
});

test("t10", () => {
    expect(exi2.isSatisfied(s, e)).toBe(false);
});
