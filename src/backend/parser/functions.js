var functions = {};

functions.checkConstantOccurence = function (constant, list, language, location) {
    if (list.findIndex(e => e === constant) > -1) {
        return {message: 'Jazyk už obsahuje symbol konštanty ' + constant, pos: location}
    }
    if (language.hasPredicate(constant)) {
        return {message: 'Jazyk už obsahuje predikátový symbol ' + constant, pos: location};
    }
    if (language.hasFunction(constant)) {
        return {message: 'Jazyk už obsahuje funkčný symbol ' + constant, pos: location};
    }
    return null;
};

functions.checkPredicateOccurence = function (predicate, list, language, location) {
    if (list.findIndex(e => e.name === predicate) > -1) {
        return {message: 'Jazyk už obsahuje predikátový symbol ' + predicate, pos: location};
    }
    if (language.hasConstant(predicate)) {
        return {message: 'Jazyk už obsahuje symbol konštanty ' + predicate, pos: location}
    }
    if (language.hasFunction(predicate)) {
        return {message: 'Jazyk už obsahuje funkčný symbol ' + predicate, pos: location};
    }
    return null;
};

functions.checkFunctionOccurence = function (fun, list, language, location) {
    if (list.findIndex(e => e.name === fun) > -1) {
        return {message: 'Jazyk už obsahuje funkčný symbol ' + fun, pos: location};
    }
    if (language.hasConstant(fun)) {
        return {message: 'Jazyk už obsahuje symbol konštanty ' + fun, pos: location}
    }
    if (language.hasPredicate(fun)) {
        return {message: 'Jazyk už obsahuje predikátový symbol ' + fun, pos: location};
    }
    return null;
};

exports.data = functions;