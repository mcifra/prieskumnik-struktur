{
    const Conjunction = options.conjunction;
    const Disjunction = options.disjunction;
    const Implication = options.implication;
    const ExistentialQuant = options.existentialQuant;
    const UniversalQuant = options.universalQuant;
    const Negation = options.negation;
    const Constant = options.constant;
    const Language = options.language;
    const FunctionTerm = options.functionTerm;
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
git
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
    = t:term spaces "," spaces ts:terms {return t.concat(ts)}
    / t:term {return [t]}

term
    = spaces i:identifier spaces a:arguments {return new FunctionTerm(i, a)}
    / i:identifier {return new Constant(i)}

identifier
    = i:$ [a-zA-Z0-9_]+ {return i}