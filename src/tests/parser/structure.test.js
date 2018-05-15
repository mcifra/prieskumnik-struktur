let parser = require('../../parser/grammar');

describe('domain', () => {
  it('should parse valid input 1', () => {
    let input = '1, 2, 3';
    expect(parser.parse(input, {startRule: 'domain'})).toEqual(['1', '2', '3']);
  });
  it('should parse valid input 2', () => {
    let input = '1,2,3';
    expect(parser.parse(input, {startRule: 'domain'})).toEqual(['1', '2', '3']);
  });
  it('should parse valid input 3', () => {
    let input = '  1  ,  2   ,   3   ';
    expect(parser.parse(input, {startRule: 'domain'})).toEqual(['1', '2', '3']);
  });
  it('should parse valid input 4', () => {
    let input = 'strom, dom, auto';
    expect(parser.parse(input, {startRule: 'domain'})).toEqual(['strom', 'dom', 'auto']);
  });
  it('should parse emoji', () => {
    let input = '😀, 👍';
    expect(parser.parse(input, {startRule: 'domain'})).toEqual(['😀', '👍']);
  });
  it('should throw exception on identifier with whitespace', () => {
    let input = 'nieco 2, nic';
    expect(() => parser.parse(input, {startRule: 'domain'})).toThrow();
  });
  it('should throw exception on identifier with brackets', () => {
    let input = 'function(), strom';
    expect(() => parser.parse(input, {startRule: 'domain'})).toThrow();
  });
});

describe('predicates value', () => {
  it('should parse valid input 1', () => {
    let input = '(1,2), (2,3)';
    expect(parser.parse(input, {startRule: 'tuples'})).toEqual([['1', '2'], ['2', '3']]);
  });
  it('should parse valid input 2', () => {
    let input = ' (  1 ,  2) , ( 2 ,  3 )';
    expect(parser.parse(input, {startRule: 'tuples'})).toEqual([['1', '2'], ['2', '3']]);
  });
  it('should parse valid input 3', () => {
    let input = '1, 2';
    expect(parser.parse(input, {startRule: 'tuples'})).toEqual([['1'], ['2']]);
  });
  it('should parse valid input 4', () => {
    let input = '😂';
    expect(parser.parse(input, {startRule: 'tuples'})).toEqual([['😂']]);
  });
});

describe('functions value', () => {

});