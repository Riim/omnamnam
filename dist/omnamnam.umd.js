(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.omnamnam = {}));
}(this, (function (exports) { 'use strict';

	const KEY_STATE = Symbol('state');

	const check = (type, value) => type[KEY_STATE].validators.some(cb1, value);
	function cb1(validators) {
	    return validators.length == 1 ? validators[0](this) : validators.every(cb2, this);
	}
	function cb2(validator) {
	    return validator(this);
	}

	function addTypeValidators(type, newTypeProto, andMode, validators) {
	    let newType = ((value) => check(newType, value));
	    newType.__proto__ = newTypeProto;
	    let validators_ = type[KEY_STATE].validators.slice();
	    if (andMode) {
	        validators_[validators_.length - 1] = [
	            ...validators_[validators_.length - 1],
	            ...validators
	        ];
	    }
	    else {
	        validators_.push(validators);
	    }
	    newType[KEY_STATE] = { validators: validators_, andMode: false };
	    return newType;
	}

	const validationState = {
	    currentKeypath: '',
	    errorKeypatch: null
	};

	const typeProto = {
	    __proto__: Function.prototype,
	    [KEY_STATE]: null,
	    get and() {
	        let types = {
	            __proto__: typesProto,
	            [KEY_STATE]: { validators: this[KEY_STATE].validators, andMode: true }
	        };
	        return types;
	    },
	    get or() {
	        let types = {
	            __proto__: typesProto,
	            [KEY_STATE]: this[KEY_STATE]
	        };
	        return types;
	    },
	    allow(value) {
	        return addTypeValidators(this, typeProto, false, [(val) => val === value]);
	    }
	};

	function cb(item, index) {
	    let prevKeypath = validationState.currentKeypath;
	    validationState.currentKeypath = validationState.currentKeypath + `[${index}]`;
	    let result = this(item);
	    if (!result && !validationState.errorKeypatch) {
	        validationState.errorKeypatch = validationState.currentKeypath;
	    }
	    validationState.currentKeypath = prevKeypath;
	    return result;
	}
	const arrayTypeProto = {
	    __proto__: typeProto,
	    of(validator) {
	        return addTypeValidators(this, arrayTypeProto, true, [
	            (arr) => arr.every(cb, validator)
	        ]);
	    }
	};

	const dateTypeProto = {
	    __proto__: typeProto,
	    before(beforeDate) {
	        return addTypeValidators(this, dateTypeProto, true, [
	            (date) => date < new Date(beforeDate)
	        ]);
	    },
	    after(afterDate) {
	        return addTypeValidators(this, dateTypeProto, true, [
	            (date) => date > new Date(afterDate)
	        ]);
	    }
	};

	const mapTypeProto = {
	    __proto__: typeProto,
	    of(validator) {
	        return addTypeValidators(this, mapTypeProto, true, [
	            (map) => {
	                for (let entry of map) {
	                    let prevKeypath = validationState.currentKeypath;
	                    validationState.currentKeypath =
	                        validationState.currentKeypath + `[${entry[0]}]`;
	                    if (!validator(entry)) {
	                        if (!validationState.errorKeypatch) {
	                            validationState.errorKeypatch = validationState.currentKeypath;
	                        }
	                        validationState.currentKeypath = prevKeypath;
	                        return false;
	                    }
	                    validationState.currentKeypath = prevKeypath;
	                }
	                return true;
	            }
	        ]);
	    },
	    values(validator) {
	        return addTypeValidators(this, mapTypeProto, true, [
	            (map) => {
	                for (let [key, value] of map) {
	                    let prevKeypath = validationState.currentKeypath;
	                    validationState.currentKeypath = validationState.currentKeypath + `[${key}]`;
	                    if (!validator(value)) {
	                        if (!validationState.errorKeypatch) {
	                            validationState.errorKeypatch = validationState.currentKeypath;
	                        }
	                        validationState.currentKeypath = prevKeypath;
	                        return false;
	                    }
	                    validationState.currentKeypath = prevKeypath;
	                }
	                return true;
	            }
	        ]);
	    },
	    keys(validator) {
	        return addTypeValidators(this, mapTypeProto, true, [
	            (map) => {
	                for (let [key] of map) {
	                    let prevKeypath = validationState.currentKeypath;
	                    validationState.currentKeypath = validationState.currentKeypath + `[${key}]`;
	                    if (!validator(key)) {
	                        if (!validationState.errorKeypatch) {
	                            validationState.errorKeypatch = validationState.currentKeypath;
	                        }
	                        validationState.currentKeypath = prevKeypath;
	                        return false;
	                    }
	                    validationState.currentKeypath = prevKeypath;
	                }
	                return true;
	            }
	        ]);
	    }
	};

	const numberTypeProto = {
	    __proto__: typeProto,
	    min(minValue) {
	        return addTypeValidators(this, numberTypeProto, true, [(num) => num >= minValue]);
	    },
	    max(maxValue) {
	        return addTypeValidators(this, numberTypeProto, true, [(num) => num <= maxValue]);
	    },
	    get positive() {
	        return this.min(0);
	    },
	    get negative() {
	        return addTypeValidators(this, numberTypeProto, true, [(num) => num < 0]);
	    }
	};

	function cb1$1(entry) {
	    let [key, validator] = entry;
	    let prevKeypath = validationState.currentKeypath;
	    validationState.currentKeypath =
	        validationState.currentKeypath + (validationState.currentKeypath ? '.' : '') + key;
	    let result = validator(this[key]);
	    if (!result && !validationState.errorKeypatch) {
	        validationState.errorKeypatch = validationState.currentKeypath;
	    }
	    validationState.currentKeypath = prevKeypath;
	    return result;
	}
	function cb2$1(entry) {
	    let [key, value] = entry;
	    let prevKeypath = validationState.currentKeypath;
	    validationState.currentKeypath =
	        validationState.currentKeypath + (validationState.currentKeypath ? '.' : '') + key;
	    let result = this(value);
	    if (!result && !validationState.errorKeypatch) {
	        validationState.errorKeypatch = validationState.currentKeypath;
	    }
	    validationState.currentKeypath = prevKeypath;
	    return result;
	}
	const objectTypeProto = {
	    __proto__: typeProto,
	    shape(shape, partial) {
	        let validators = [];
	        if (!partial) {
	            let shapeKeys = Object.keys(shape);
	            let hasKey = (key) => shapeKeys.includes(key);
	            validators.push((obj) => Object.keys(obj).every(hasKey));
	        }
	        let shapeEntries = Object.entries(shape);
	        validators.push((obj) => shapeEntries.every(cb1$1, obj));
	        return addTypeValidators(this, objectTypeProto, true, validators);
	    },
	    partialShape(shape) {
	        return this.shape(shape, true);
	    },
	    values(validator) {
	        return addTypeValidators(this, objectTypeProto, true, [
	            (obj) => Object.entries(obj).every(cb2$1, validator)
	        ]);
	    }
	};

	const setTypeProto = {
	    __proto__: typeProto,
	    of(validator) {
	        return addTypeValidators(this, setTypeProto, true, [
	            (set) => {
	                let index = 0;
	                for (let item of set) {
	                    let prevKeypath = validationState.currentKeypath;
	                    validationState.currentKeypath =
	                        validationState.currentKeypath + `[${index++}]`;
	                    if (!validator(item)) {
	                        if (!validationState.errorKeypatch) {
	                            validationState.errorKeypatch = validationState.currentKeypath;
	                        }
	                        validationState.currentKeypath = prevKeypath;
	                        return false;
	                    }
	                    validationState.currentKeypath = prevKeypath;
	                }
	                return true;
	            }
	        ]);
	    }
	};

	const stringTypeProto = {
	    __proto__: typeProto,
	    get nonZero() {
	        return addTypeValidators(this, stringTypeProto, true, [(str) => str.length > 0]);
	    },
	    get nonEmpty() {
	        return addTypeValidators(this, stringTypeProto, true, [(str) => /\S/.test(str)]);
	    },
	    min(minLength) {
	        return addTypeValidators(this, stringTypeProto, true, [
	            (str) => str.length >= minLength
	        ]);
	    },
	    max(maxVength) {
	        return addTypeValidators(this, stringTypeProto, true, [
	            (str) => str.length <= maxVength
	        ]);
	    },
	    match(re) {
	        return addTypeValidators(this, stringTypeProto, true, [(str) => re.test(str)]);
	    }
	};

	const isNull = (value) => value === null;
	const isUndefined = (value) => value === undefined;
	const isVacuum = (value) => value == null;
	const isBoolean = (value) => typeof value == 'boolean';
	const isNumber = (value) => typeof value == 'number' && Number.isFinite(value) && !Number.isNaN(value);
	const isString = (value) => typeof value == 'string';
	const isSymbol = (value) => typeof value == 'symbol';
	const isObject = (value) => value === Object(value);
	const isArray = Array.isArray;
	const isFunction = (value) => typeof value == 'function';
	const isSet = (value) => value instanceof Set;
	const isMap = (value) => value instanceof Map;
	const isWeakSet = (value) => value instanceof WeakSet;
	const isWeakMap = (value) => value instanceof WeakMap;
	const isDate = (value) => value instanceof Date;
	const isRegExp = (value) => value instanceof RegExp;
	const isPromise = (value) => value instanceof Promise;
	const isError = (value) => value instanceof Error;
	const typesProto = {
	    [KEY_STATE]: null,
	    custom(validator, _typeProto = typeProto) {
	        return addTypeValidators(this, _typeProto, this[KEY_STATE].andMode, [validator]);
	    },
	    get null() {
	        return this.custom(isNull);
	    },
	    get undefined() {
	        return this.custom(isUndefined);
	    },
	    get vacuum() {
	        return this.custom(isVacuum);
	    },
	    get boolean() {
	        return this.custom(isBoolean);
	    },
	    get number() {
	        return this.custom(isNumber, numberTypeProto);
	    },
	    get string() {
	        return this.custom(isString, stringTypeProto);
	    },
	    get symbol() {
	        return this.custom(isSymbol);
	    },
	    get object() {
	        return this.custom(isObject, objectTypeProto);
	    },
	    get array() {
	        return this.custom(isArray, arrayTypeProto);
	    },
	    get function() {
	        return this.custom(isFunction);
	    },
	    get func() {
	        return this.function;
	    },
	    get map() {
	        return this.custom(isMap, mapTypeProto);
	    },
	    get set() {
	        return this.custom(isSet, setTypeProto);
	    },
	    get weakMap() {
	        return this.custom(isWeakMap, mapTypeProto);
	    },
	    get wmap() {
	        return this.weakMap;
	    },
	    get weakSet() {
	        return this.custom(isWeakSet, setTypeProto);
	    },
	    get wset() {
	        return this.weakSet;
	    },
	    get date() {
	        return this.custom(isDate, dateTypeProto);
	    },
	    get regExp() {
	        return this.custom(isRegExp);
	    },
	    get regex() {
	        return this.regExp;
	    },
	    get promise() {
	        return this.custom(isPromise);
	    },
	    get error() {
	        return this.custom(isError);
	    }
	};

	const om = ((validator, value) => {
	    validationState.errorKeypatch = null;
	    if (!validator(value)) {
	        if (validationState.errorKeypatch) {
	            throw TypeError(`Type mismatch at "${validationState.errorKeypatch}"`);
	        }
	        throw TypeError('Type mismatch');
	    }
	    return true;
	});
	om.__proto__ = typesProto;
	om[KEY_STATE] = {
	    validators: [],
	    andMode: false
	};

	exports.default = om;
	exports.om = om;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
