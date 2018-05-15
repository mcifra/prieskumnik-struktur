import Constant from "../../model/term/Term.Constant";
import Negation from "../../model/formula/Formula.Negation";
import Implication from "../../model/formula/Formula.Implication";
import EqualityAtom from "../../model/formula/Formula.EqualityAtom";
import Disjunction from "../../model/formula/Formula.Disjunction";
import PredicateAtom from "../../model/formula/Formula.PredicateAtom";
import Conjunction from "../../model/formula/Formula.Conjunction";
import Variable from "../../model/term/Term.Variable";
import UniversalQuant from "../../model/formula/Formula.UniversalQuant";
import FunctionTerm from "../../model/term/Term.FunctionTerm";
import ExistentialQuant from "../../model/formula/Formula.ExistentialQuant";
import Structure from "../../model/Structure";
import Language from '../../model/Language';

let parser = require('../../parser/grammar');

describe('consttants and variables', ()=>{

});

describe('predicates', () => {
  let structure = new Structure(new Language());
  structure.setLanguagePredicates([
    {name: 'p', arity: '2'},
    {name: 'q', arity: '1'},
    {name: 'r', arity: '3'}
  ]);
  structure.setLanguageConstants(['A', 'B', 'C']);
  let parserOptions = () => ({
    startRule: 'formula',
    structure: structure,
    conjunction: Conjunction,
    disjunction: Disjunction,
    implication: Implication,
    variable: Variable,
    constant: Constant,
    existentialQuant: ExistentialQuant,
    universalQuant: UniversalQuant,
    functionTerm: FunctionTerm,
    predicate: PredicateAtom,
    negation: Negation,
    equalityAtom: EqualityAtom
  });

  it('q(x)', () => {
    let input = '(q(x))';
    let exRes = new PredicateAtom('q', [new Variable('x')]);
    expect(parser.parse(input, parserOptions())).toEqual(exRes);
  });
  it('q(B)', () => {
    let input = '(q(B))';
    let exRes = new PredicateAtom('q', [new Constant('B')]);
    expect(parser.parse(input, parserOptions()))
  });
  it('invalid arity p(A)', () => {
    let input = '(p(A))';
    expect(() => parser.parse(input, parserOptions())).toThrow('Predicate p has arity 2');
  });
  it('empty arguments p()', () => {
    let input = '(p())';
    expect(() => parser.parse(input, parserOptions())).toThrow('Predicate p has arity 2');
  });
  it('nested ((p(A,z)))', () => {
    let input = '((p(A,z)))';
    let exRes = new PredicateAtom('p', [new Constant('A'), new Variable('z')]);
    expect(parser.parse(input, parserOptions())).toEqual(exRes);
  });
  it('not in language k(x)', () => {
    let input = '(k(x))';
    expect(() => parser.parse(input, parserOptions())).toThrow('Expected "!=", "/=", "<>", "=", or "≠" but "(" found.');
  });

});

describe('conjunction', () => {
  let parserOptions = () => ({
    startRule: 'formula',
    structure: new Structure(new Language()),
    conjunction: Conjunction,
    disjunction: Disjunction,
    implication: Implication,
    variable: Variable,
    constant: Constant,
    existentialQuant: ExistentialQuant,
    universalQuant: UniversalQuant,
    functionTerm: FunctionTerm,
    predicate: PredicateAtom,
    negation: Negation,
    equalityAtom: EqualityAtom
  });
  it('should parse p(x) & q(y)', () => {
    let options = parserOptions();
    options.structure.language.setPredicates([{name: 'p', arity: '1'}, {name: 'q', arity: '1'}]);
    let formula = '(p(x) & q(y))';
    let exParsed = new Conjunction(new PredicateAtom('p', [new Variable('x')]), new PredicateAtom('q', [new Variable('y')]));
    expect(parser.parse(formula, options)).toEqual(exParsed);
  });
  it('should parse p(x) /\\ q(y)', () => {
    let options = parserOptions();
    options.structure.language.setPredicates([{name: 'p', arity: '1'}, {name: 'q', arity: '1'}]);
    let formula = '(p(x) /\\ q(y))';
    let exParsed = new Conjunction(new PredicateAtom('p', [new Variable('x')]), new PredicateAtom('q', [new Variable('y')]));
    expect(parser.parse(formula, options)).toEqual(exParsed);
  });
  it('should parse p(x) && q(y)', () => {
    let options = parserOptions();
    options.structure.language.setPredicates([{name: 'p', arity: '1'}, {name: 'q', arity: '1'}]);
    let formula = '(p(x) && q(y))';
    let exParsed = new Conjunction(new PredicateAtom('p', [new Variable('x')]), new PredicateAtom('q', [new Variable('y')]));
    expect(parser.parse(formula, options)).toEqual(exParsed);
  });
  it('should parse p(x) \\land q(y)', () => {
    let options = parserOptions();
    options.structure.language.setPredicates([{name: 'p', arity: '1'}, {name: 'q', arity: '1'}]);
    let formula = '(p(x) \\land q(y))';
    let exParsed = new Conjunction(new PredicateAtom('p', [new Variable('x')]), new PredicateAtom('q', [new Variable('y')]));
    expect(parser.parse(formula, options)).toEqual(exParsed);
  });
  it('should parse p(x) \\wedge q(y)', () => {
    let options = parserOptions();
    options.structure.language.setPredicates([{name: 'p', arity: '1'}, {name: 'q', arity: '1'}]);
    let formula = '(p(x) \\wedge q(y))';
    let exParsed = new Conjunction(new PredicateAtom('p', [new Variable('x')]), new PredicateAtom('q', [new Variable('y')]));
    expect(parser.parse(formula, options)).toEqual(exParsed);
  });
  it('should parse p(x) ∧ q(y)', () => {
    let options = parserOptions();
    options.structure.language.setPredicates([{name: 'p', arity: '1'}, {name: 'q', arity: '1'}]);
    let formula = '(p(x) ∧ q(y))';
    let exParsed = new Conjunction(new PredicateAtom('p', [new Variable('x')]), new PredicateAtom('q', [new Variable('y')]));
    expect(parser.parse(formula, options)).toEqual(exParsed);
  });
  it('should not parse p(x) \\landq(y)', () => {
    let options = parserOptions();
    options.structure.language.setPredicates([{name: 'p', arity: '1'}, {name: 'q', arity: '1'}]);
    let formula = '(p(x) \\landq(y))';
    expect(() => parser.parse(formula, options)).toThrow();
  });

});