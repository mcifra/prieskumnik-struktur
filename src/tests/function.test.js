import FunctionAtom from "../model/term/Term.FunctionTerm";
import Constant from "../model/term/Term.Constant";
import Language from "../model/Language";
import Structure from "../model/Structure";
import Variable from "../model/term/Term.Variable";

var l = new Language();
l.addConstant("C1");
l.addFunction("fun1", 1);
l.addFunction("fun2", 2);

var e = new Map();
e.set("x", "a");

var s = new Structure(l);
s.addDomainItem("c");
s.addDomainItem("a");
s.addDomainItem("b");

var c1 = new Constant("C1");
s.setConstantValue("C1", "c");

// fun1(C1)
var fun1 = new FunctionAtom("fun1", [c1]);
s.setFunctionValue("fun1", ["c"], "a");

// fun2(C1, x)
var v1 = new Variable("x");
var fun2 = new FunctionAtom("fun2", [c1, v1]);
s.setFunctionValue("fun2", ["c", "a"], "b");


test("t1", () => {
  expect(fun1.toString()).toBe("fun1(C1)");
});

test("t2", () => {
  expect(fun1.interpret(s, e)).toBe("a");
});

test("t3", () => {
  expect(fun2.interpret(s, e)).toBe("b");
});

test("t4", () => {
  expect(fun2.toString()).toBe("fun2(C1, x)");
});
