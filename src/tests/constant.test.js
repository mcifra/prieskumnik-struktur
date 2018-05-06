import Language from "../model/Language";
import Structure from "../model/Structure";
import Constant from "../model/term/Term.Constant";

var l = new Language();
l.addConstant("C1");

var s = new Structure(l);
s.addDomainItem("c");
s.setConstantValue("C1", "c");
s.setConstantValue("C2", "d");

var e = new Map();

var c1 = new Constant("C1");
var c2 = new Constant("C2");
var c3 = new Constant("C3");


test("t1", () => {
  expect(c1.toString()).toBe("C1");
});

test("t2", () => {
  expect(c1.interpret(s, e)).toBe("c");
});

test("t3", () => {
  expect(c2.interpret(s, e)).toBe("d");
});