start
    = constants_list

constants_list
    = spaces i1:identifier spaces "," spaces i2:constants_list spaces {return [i1].concat(i2)}
    / spaces i:identifier spaces {return [i]}

identifier "identifier"
    = i:$ [a-zA-Z0-9_]+ {return i}

spaces "spaces"
    = [ \t\n\r]*