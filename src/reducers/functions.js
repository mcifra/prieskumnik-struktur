let parser = require('../parser/grammar');
let exports = module.exports = {};

exports.parseText = function(text, textData, parserOptions) {
   textData.value = text;
   textData.feedback = {type: null, message: ''};
   if (text.length === 0) {
      textData.parsed = [];
      return;
   }
   try {
      let parsedValue = parser.parse(text, parserOptions);
      if (parsedValue.items)
         textData.parsed = parsedValue.items;
      else
         textData.parsed = parsedValue;
   } catch (e) {
      console.error(e);
      textData.feedback.type = 'error';
      textData.feedback.message = e.message;
      textData.parsed = null;
   }
};