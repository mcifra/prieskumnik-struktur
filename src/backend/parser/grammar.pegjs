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

    function varOrConst(i) {
        if (Language.hasConstant(i)) {return new Constant(i);}
        else {return new Variable(i);}
    }
    function predicateOrFunction(i, a) {
        if (Language.hasFunction(i)) {
            if (Language.getFunction(i) == a.length) {
                return new FunctionTerm(i, a);
            } else {
                error("Function term " + i + " has arity " + Language.getFunction(i));
            }
        } else if (Language.hasPredicate(i)) {
            if (Language.getPredicate(i) === a.length) {
                return new Predicate(i, a);
            } else {
                error("Predicate " + i + " has arity " + Language.getPredicate(i));
            }
        } else {
            error("Function or predicate " + i + " not found in language");
        }
    }
}

start
    = formula

formula
    = spaces "(" spaces left:formula spaces conjunction_symbol spaces right:formula spaces ")" spaces {return new Conjunction(left, right)}
    / spaces "(" spaces left:formula spaces disjunction_symbol spaces right:formula spaces ")" spaces {return new Disjunction(left, right)}
    / spaces "(" spaces left:formula spaces implication_symbol spaces right:formula spaces ")" spaces {return new Implication(left, right)}
    / spaces exists_symbol spaces v:$ [a-z0-9]+ spaces f:formula spaces {return new ExistentialQuant(v, f)}
    / spaces uni_symbol spaces v:$ [a-z]+ spaces f:formula spaces {return new UniversalQuant(v, f)}
    / spaces negation_symbol f:formula spaces {return new Negation(f)}
    / spaces t:term spaces {return t}
    / spaces "(" spaces f:formula spaces ")" spaces {return f}

spaces "spaces"
    = [ \t\n\r]*

conjunction_symbol
    = "\\wedge"
    / "\\land"
    / "&&"
    / "&"
    / "∧"
    / "/\\"

disjunction_symbol
    = "||"
    / "|"
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
    = "(" spaces t:terms spaces ")" {return t}

terms
    = t:term spaces "," spaces ts:terms {return [t].concat(ts)}
    / t:term {return [t]}

term
    = spaces i:identifier spaces a:arguments {return predicateOrFunction(i, a)}
    / i:identifier { return varOrConst(i) }

identifier "identifier"
    = i:$ [a-zA-Z0-9_]+ {return i}