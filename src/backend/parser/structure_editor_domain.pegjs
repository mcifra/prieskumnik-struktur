start
    = items_list

items_list
    = spaces i:identifier spaces "," spaces l:items_list {return [i].concat(l)}
    / spaces i:identifier spaces {return [i]}

identifier "identifier"
    = i:$ [a-zA-Z0-9_]+ {return i}

spaces "spaces"
    = [ /t/n/r]*
