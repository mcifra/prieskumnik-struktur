let parser = require('../parser/grammar');
let exports = module.exports = {};

exports.parseText = function (text, textData, parserOptions) {
  textData.value = text;
  textData.errorMessage = '';
  if (text.length === 0) {
    textData.parsed = [];
    return;
  }
  try {
    let parsedValue = parser.parse(text, parserOptions);
    if (parsedValue.items) {
      textData.parsed = parsedValue.items;
    } else {
      textData.parsed = parsedValue;
    }
  } catch (e) {
    console.error(e);
    textData.errorMessage = e.message;
    textData.parsed = null;
  }
};