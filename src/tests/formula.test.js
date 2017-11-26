
import Language from "../backend/Language";
import Structure from "../backend/Structure";
import Conjunction from "../backend/formula/Formula.Conjunction";
import Constant from "../backend/term/Term.Constant";
import Function from "../backend/term/Term.Function";
import PredicateSymbol from "../backend/formula/Formula.PredicateSymbol";
import Variable from "../backend/term/Term.Variable";
import Negation from "../backend/formula/Formula.Negation";
import Disjunction from "../backend/formula/Formula.Disjunction";
import Implication from "../backend/formula/Formula.Implication";

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
s.setPredicateValue("likes", [ ["b", "b"] ]);
s.setPredicateValue("hates", [ ["c", "a"] ]);
s.setFunctionValue("mother", ["a"], "b");
s.setFunctionValue("mother", ["c"], "a");

var c1 = new Constant("C1");
var c2 = new Constant("C2");
var v1 = new Variable("x");
var v2 = new Variable("y");
var f1 = new Function("mother", [c1]);
var p1 = new PredicateSymbol("likes", [f1, v1]);
var p2 = new PredicateSymbol("hates", [c2, v2]);

var con1 = new Conjunction(p1, new Negation(p2));
var dis1 = new Disjunction(p1, p2);
var imp1 = new Implication(p1, p2);

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

