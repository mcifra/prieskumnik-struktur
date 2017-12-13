{
    const Conjunction = options.conjunction;
    const Disjunction = options.disjunction;
    const Implication = options.implication;
    const ExistentialQuant = options.existentialQuant;
    const UniversalQuant = options.universalQuant;
    const Negation = options.negation;
    const Constant = options.constant;
    const Variable = options.variable;
    const Language = options.language;
    const FunctionTerm = options.functionTerm;
    const Predicate = options.predicate;
}

start
    = formula

formula
    = spaces "(" spaces left:formula spaces conjunction_symbol spaces right:formula spaces ")" spaces {return new Conjunction(left, right)}
    / spaces "(" spaces left:formula spaces disjunction_symbol spaces right:formula spaces ")" spaces {return new Disjunction(left, right)}
    / spaces "(" spaces left:formula spaces implication_symbol spaces right:formula spaces ")" spaces {return new Implication(left, right)}
    / spaces exists_symbol v:$ [a-z0-9]+ spaces f:formula spaces {return new ExistentialQuant(v, f)}
    / spaces uni_symbol v:$ [a-z]+ spaces f:formula spaces {return new UniversalQuant(v, f)}
    / spaces negation_symbol f:formula spaces {return new Negation(f)}
    / spaces t:term spaces {return t}
    / spaces "(" spaces f:formula spaces ")" spaces {return f}

spaces
    = [ \t\n\r]*

conjunction_symbol
    = "\\wedge"
    / "\\land"
    / "&"
    / "&&"
    / "∧"
    / "/\\"

disjunction_symbol
    = "|"
    / "||"
    / "\\vee"
    / "∨"
    / "\\/"

implication_symbol
    = "->"
    / "\\to"
    / "→"

exists_symbol
    = "∃"
    / "\\exists"

uni_symbol
    = "∀"
    / "\\forall"

negation_symbol
    = "-"
    / "!"
    / "~"
    / "\\neg"
    / "¬"

arguments
    = "(" spaces t:terms spaces")" {return t}

terms
    = t:term spaces "," spaces ts:terms {return [t].concat(ts)}
    / t:term {return [t]}

term
    = spaces i:identifier spaces a:arguments {if (Language.hasFunction(i)) return new FunctionTerm(i,a); else if (Language.hasPredicate(i)) return new Predicate(i,a); else throw "ERROR";}
    / i:identifier { return Language.hasConstant(i) ? new Constant(i) : new Variable(i); }

identifier
    = i:$ [a-zA-Z0-9_]+ {return i}