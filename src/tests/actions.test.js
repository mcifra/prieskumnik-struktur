import * as actions from '../actions/index';

describe('actions', () => {
  it('vytvorenie akcie pre zmenu konstant', () => {
    const value = 'a, b, c';
    const expectedAction = {
      type: 'SET_CONSTANTS',
      value: value
    };
    expect(actions.setConstants(value)).toEqual(expectedAction);
  })
});