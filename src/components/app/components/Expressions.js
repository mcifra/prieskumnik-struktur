import React from 'react';

const Expressions = ({formulas, terms, onInputChange, addExpression, onAnswerSelect, domain}) => (
    <div>
        <p>Formuly</p>
        {formulas.map((formula, index) =>
            <div>
                <label>{'Formula ' + (index + 1)}</label>
                <input type='text' onChange={(e) => onInputChange(e.target.value, index, 'FORMULA')}/>
                <select value={formula.answerValue} onChange={(e) => onAnswerSelect(e.target.value, 'FORMULA', index)}>
                    <option value={''}>{''}</option>
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>
                <span>{formula.feedbackMessage}</span>
            </div>
        )}
        <button onClick={() => addExpression('FORMULA')}>Pridaj</button>
        <p>Termy</p>
        {terms.map((term, index) =>
            <div>
                <label>{'Term ' + (index + 1)}</label>
                <input type='text' onChange={(e) => onInputChange(e.target.value, index, 'TERM')}/>
                <select value={term.answerValue} onChange={(e) => onAnswerSelect(e.target.value, 'TERM', index)}>
                    <option value={''}>{''}</option>
                    {[...domain].map((item, index) =>
                        <option value={item}>{item}</option>
                    )}
                </select>
                <span>{term.feedbackMessage}</span>
            </div>
        )}
        <button onClick={() => addExpression('TERM')}>Pridaj</button>
    </div>
);

export default Expressions;