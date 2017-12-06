{
    const Conjunction = options.conjunction;
    const Disjunction = options.disjunction;
    const Implication = options.implication;
    const ExistentialQuant = options.existentialQuant;
    const UniversalQuant = options.universalQuant;
    const Negation = options.negation;
    const Constant = options.constant;
}

start
    = formula

formula
    = "(" left:formula " && " right:formula ")" {return new Conjunction(left, right)}
    / "(" left:formula " || " right:formula ")" {return new Disjunction(left, right)}
    / "(" left:formula " -> " right:formula ")" {return new Implication(left, right)}
    / "(E" v:$ [a-z]+ " " f:formula ")" {return new ExistentialQuant(v, f)}
    / "(V" v:$ [a-z]+ " " f:formula ")" {return new UniversalQuant(v, f)}
    / "-" f:formula {return new Negation(f)}
    / c:$ [A-Z]+ { return new Constant(c)}


