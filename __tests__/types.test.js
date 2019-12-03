const {
  isNumber,
  castToNumber,
  getCaster,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToString
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a numbers', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });
    it('tells if value is a string', () => {
      expect(isString('cat')).toBeTruthy();
      expect(isString(3)).toBeFalsy();
      expect(isString(true)).toBeFalsy(); 
      
    });

    it('tells if value is boolean', () => {
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean('cow')).toBeFalsy();
      expect(isBoolean(23)).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
    });

    it('tells if value is an array', () => {
      expect(isArray('notArray')).toBeFalsy();
      expect(isArray([1, 2, true])).toBeTruthy();
      expect(isArray(42)).toBeFalsy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(true)).toBeFalsy();
      expect(isArray([])).toBeTruthy();
    });

    it('tells if value is an object', () => {
      expect(isObject(888)).toBeFalsy();
      expect(isObject('huh???')).toBeFalsy();
      expect(isObject(false)).toBeFalsy();
      expect(isObject([])).toBeFalsy();
      expect(isObject({})).toBeTruthy();
    });

    it('tells if a value is a function', () => {
      expect(isFunction('lol')).toBeFalsy();
      expect(isFunction(42)).toBeFalsy();
      expect(isFunction(true)).toBeFalsy();
      expect(isFunction({})).toBeFalsy();
      expect(isFunction(['no', 'no', 'yes'])).toBeFalsy();
      expect(isFunction((a, b) => {
        return a + b;
      })).toBeTruthy();

    });
  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });
  });

  it('can cast values to a string', () => {
    expect(castToString(3)).toEqual('3');
    expect(castToString('3')).toEqual('3');
    expect(castToString(true)).toEqual('true');
    expect(() => castToString({})).toThrowErrorMatchingSnapshot();
  });


});

// it('can get the right caster', () => {
//   expect(getCaster(String)).toEqual(castToString);
//   expect(getCaster(Number)).toEqual(castToNumber);
// //boolean
//   expect(getCaster(Promise)).toBeNull();
// });




