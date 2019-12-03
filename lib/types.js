const isNumber = val => typeof val === 'number';
const isString = val => typeof val === 'string';
const isBoolean = val => typeof val === 'boolean';
const isArray = val =>  Array.isArray(val);
const isObject = val => val && typeof val === 'object' && val.constructor === Object;
const isFunction = val => typeof val === 'function';



const castToNumber = val => {
  if(isNumber(val)) return val;
  const number = Number(val);
  if(isNaN(number)) throw new CastError(Number, val);
  return number;
};

const castToString = val => {
  if(isString(val)) return val;
  if(isNumber(val)) return val.toString();
  if(isBoolean(val)) return val.toString();
  if(isArray(val)) return val.toString();
  if(isObject(val)) throw new StringCastError(String, val);
};

class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

class StringCastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Do you really want to cast >>${value}<< to ${type}?`);
    this.type = type;
    this.value = value;
  }
}

const castToArray = caster => val => {
  try {
    return val.map(caster);
  } catch(e) {
    throw new CastError(Array, val);
  }
};

const castToBoolean = val => {
  if(isBoolean(val)) return val;
  if(val === 1) return true;
  if(val === 0) return false;
  throw new CastError(Boolean, val);
};


const casters = {
  String: castToString,
  Number: castToNumber,
  Boolean: castToBoolean
};

const getCaster = Type => {
  if(isArray(Type)) return castToArray(casters[Type[0].name]);
  
  return casters[Type.name] || null;
};



module.exports = {
  isNumber,
  CastError,
  StringCastError,
  getCaster,
  castToNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToString,
  castToArray,
  castToBoolean
};
