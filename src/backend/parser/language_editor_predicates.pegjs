start
    = predicates_list

predicates_list
    = f1:predicate spaces "," spaces f2:predicates_list {return [f1].concat(f2)}
    / f1:predicate {return [f1]}

predicate
    = spaces i:identifier spaces "/" spaces a:arity spaces {return {name: i, arity: a}}

arity
    = a:$ [0-9]+ {return a}

identifier
    = i:$ [a-zA-Z0-9_]+ {return i}

spaces
    = [ \t\n\r]*