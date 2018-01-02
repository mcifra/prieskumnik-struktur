start
    = functions_list

functions_list
    = f1:function spaces "," spaces f2:functions_list {return [f1].concat(f2)}
    / f1:function {return [f1]}

function
    = spaces i:identifier spaces "/" spaces a:arity spaces {return {name: i, arity: a}}

arity "arity"
    = a:$ [1-9]+[0-9]? {return a}

identifier "identifier"
    = i:$ [a-zA-Z0-9_]+ {return i}

spaces "spaces"
    = [ \t\n\r]*