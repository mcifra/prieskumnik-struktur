let parser = require('../../parser/grammar');

describe('constants', () => {
  it('should parse valid input 1', () => {
    let input = 'a,b';
    let parsed = parser.parse(input, {startRule: 'constants'});
    expect(parsed).toEqual(['a', 'b']);
  });
  it('should parse valid input 2', () => {
    let input = 'a , b';
    let parsed = parser.parse(input, {startRule: 'constants'});
    expect(parsed).toEqual(['a', 'b']);
  });
  it('should parse valid input 3', () => {
    let input = ' a ,   b   ';
    let parsed = parser.parse(input, {startRule: 'constants'});
    expect(parsed).toEqual(['a', 'b']);
  });
  it('should throw exception on empty input', () => {
    let input = '';
    expect(() => parser.parse(input, {startRule: 'constants'})).toThrow();
  });
  it('should throw exception on invalid input 1', () => {
    let input = 'a,';
    expect(() => parser.parse(input, {startRule: 'constants'})).toThrow('Expected identifier but end of input found.');
  });
  it('should throw exception on invalid input 2', () => {
    let input = 'a,,';
    expect(() => parser.parse(input, {startRule: 'constants'})).toThrow('Expected identifier but "," found.');
  });
});

describe('predicates', () => {
  it('should parse valid input 1', () => {
    let input = 'a/2, b/1';
    expect(parser.parse(input, {startRule: 'predicates'})).toEqual([{name: 'a', arity: '2'}, {name: 'b', arity: '1'}]);
  });
  it('should parse valid input 2', () => {
    let input = 'a/2 , b/1';
    expect(parser.parse(input, {startRule: 'predicates'})).toEqual([{name: 'a', arity: '2'}, {name: 'b', arity: '1'}]);
  });
  it('should parse valid input 3', () => {
    let input = ' a/2,  b/0   ';
    expect(parser.parse(input, {startRule: 'predicates'})).toEqual([{name: 'a', arity: '2'}, {name: 'b', arity: '0'}]);
  });
});