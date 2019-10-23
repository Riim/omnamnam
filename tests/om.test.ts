import { expect } from 'chai';
import om from '../src/omnamnam';

describe('om', () => {
	it('простая проверка', () => {
		let isNumber = om.number;

		expect(isNumber(1)).to.true;
		expect(isNumber('1')).to.false;
		expect(isNumber(null)).to.false;
		expect(isNumber(undefined)).to.false;
	});

	it('использование `или`', () => {
		let isNumberOrString = om.number.or.string;

		expect(isNumberOrString(true)).to.false;
		expect(isNumberOrString(1)).to.true;
		expect(isNumberOrString('1')).to.true;
		expect(isNumberOrString(null)).to.false;
		expect(isNumberOrString(undefined)).to.false;
	});

	it('или null', () => {
		let isNumberOrNull = om.number.or.null;

		expect(isNumberOrNull(1)).to.true;
		expect(isNumberOrNull('1')).to.false;
		expect(isNumberOrNull(null)).to.true;
		expect(isNumberOrNull(undefined)).to.false;
	});

	it('или null или undefined', () => {
		let isOptionalNumber = om.number.or.null.or.undefined;

		expect(isOptionalNumber(1)).to.true;
		expect(isOptionalNumber('1')).to.false;
		expect(isOptionalNumber(null)).to.true;
		expect(isOptionalNumber(undefined)).to.true;
	});

	it('пользовательский тип', () => {
		let isOne = om.custom(value => value === 1);

		expect(isOne(1)).to.true;
		expect(isOne(2)).to.false;
		expect(isOne('1')).to.false;
	});

	it('использование `и`', () => {
		let isNumberAndString = om.number.and.string;

		expect(isNumberAndString(1)).to.false;
		expect(isNumberAndString('1')).to.false;
	});

	it('использование `и` (2)', () => {
		let isNonZeroString = om.string.and.custom(str => str.length > 0);

		expect(isNonZeroString('')).to.false;
		expect(isNonZeroString('1')).to.true;
	});

	it('om.null', () => {
		let isNull = om.null;

		expect(isNull(true)).to.false;
		expect(isNull(false)).to.false;
		expect(isNull(null)).to.true;
		expect(isNull(undefined)).to.false;
	});

	it('om.undefined', () => {
		let isUndefined = om.undefined;

		expect(isUndefined(true)).to.false;
		expect(isUndefined(false)).to.false;
		expect(isUndefined(null)).to.false;
		expect(isUndefined(undefined)).to.true;
	});

	it('om.vacuum', () => {
		let isVacuum = om.vacuum;

		expect(isVacuum(true)).to.false;
		expect(isVacuum(false)).to.false;
		expect(isVacuum(null)).to.true;
		expect(isVacuum(undefined)).to.true;
	});

	it('om.boolean', () => {
		let isBoolean = om.boolean;

		expect(isBoolean(true)).to.true;
		expect(isBoolean(1)).to.false;
		expect(isBoolean('1')).to.false;
	});

	it('om.number', () => {
		let isNumber = om.number;

		expect(isNumber(true)).to.false;
		expect(isNumber(1)).to.true;
		expect(isNumber('1')).to.false;
		expect(isNumber(NaN)).to.false;
		expect(isNumber(Infinity)).to.false;
		expect(isNumber(-Infinity)).to.false;
	});

	it('om.number.min()', () => {
		let isNumberMin3 = om.number.min(3);

		expect(isNumberMin3(0)).to.false;
		expect(isNumberMin3(3)).to.true;
		expect(isNumberMin3(4)).to.true;
	});

	it('om.number.max()', () => {
		let isNumberMax3 = om.number.max(3);

		expect(isNumberMax3(0)).to.true;
		expect(isNumberMax3(3)).to.true;
		expect(isNumberMax3(4)).to.false;
	});

	it('om.number.between()', () => {
		let isNumberBetween3to5 = om.number.between(3, 5);

		expect(isNumberBetween3to5(2)).to.false;
		expect(isNumberBetween3to5(3)).to.true;
		expect(isNumberBetween3to5(4)).to.true;
		expect(isNumberBetween3to5(5)).to.true;
		expect(isNumberBetween3to5(6)).to.false;
	});

	it('om.number.positive', () => {
		let isPositiveNumber = om.number.positive;

		expect(isPositiveNumber(-1)).to.false;
		expect(isPositiveNumber(0)).to.true;
		expect(isPositiveNumber(1)).to.true;
	});

	it('om.number.negative', () => {
		let isPositiveNumber = om.number.negative;

		expect(isPositiveNumber(-1)).to.true;
		expect(isPositiveNumber(0)).to.false;
		expect(isPositiveNumber(1)).to.false;
	});

	it('om.number.integer', () => {
		let isIntegerNumber = om.number.integer;

		expect(isIntegerNumber(0)).to.true;
		expect(isIntegerNumber(0.1)).to.false;
		expect(isIntegerNumber(1)).to.true;
	});

	it('om.string', () => {
		let isString = om.string;

		expect(isString(true)).to.false;
		expect(isString(1)).to.false;
		expect(isString('1')).to.true;
	});

	it('om.string.nonZero', () => {
		let isNonZeroString = om.string.nonZero;

		expect(isNonZeroString('')).to.false;
		expect(isNonZeroString(' ')).to.true;
		expect(isNonZeroString('1')).to.true;
	});

	it('om.string.nonEmpty', () => {
		let isNonEmptyString = om.string.nonEmpty;

		expect(isNonEmptyString('')).to.false;
		expect(isNonEmptyString(' ')).to.false;
		expect(isNonEmptyString('1')).to.true;
		expect(isNonEmptyString(' 1 ')).to.true;
	});

	it('om.string.len()', () => {
		let isStringLen3 = om.string.len(3);

		expect(isStringLen3('12')).to.false;
		expect(isStringLen3('123')).to.true;
		expect(isStringLen3('1234')).to.false;
	});

	it('om.string.min()', () => {
		let isStringMin3 = om.string.min(3);

		expect(isStringMin3('')).to.false;
		expect(isStringMin3('1')).to.false;
		expect(isStringMin3('12')).to.false;
		expect(isStringMin3('123')).to.true;
	});

	it('om.string.max()', () => {
		let isStringMax3 = om.string.max(3);

		expect(isStringMax3('')).to.true;
		expect(isStringMax3('1')).to.true;
		expect(isStringMax3('12')).to.true;
		expect(isStringMax3('123')).to.true;
		expect(isStringMax3('1234')).to.false;
	});

	it('om.array', () => {
		let isArray = om.array;
		expect(isArray([])).to.true;
	});

	it('om.array.of()', () => {
		let isNumericArray = om.array.of(om.number);

		expect(isNumericArray([])).to.true;
		expect(isNumericArray([1])).to.true;
		expect(isNumericArray([1, 2])).to.true;
		expect(isNumericArray(['1'])).to.false;
		expect(isNumericArray([1, '2'])).to.false;
	});

	it('om.array.of() (2)', () => {
		let isArrayOfNumberAndString = om.array.of(om.number.or.string);

		expect(isArrayOfNumberAndString([])).to.true;
		expect(isArrayOfNumberAndString([1])).to.true;
		expect(isArrayOfNumberAndString([1, 2])).to.true;
		expect(isArrayOfNumberAndString(['1'])).to.true;
		expect(isArrayOfNumberAndString([1, '2'])).to.true;
		expect(isArrayOfNumberAndString([true])).to.false;
		expect(isArrayOfNumberAndString([true, false])).to.false;
	});

	it('om.object', () => {
		let isObject = om.object;

		expect(isObject({})).to.true;
		expect(isObject(() => {})).to.true;
	});

	it('om.object.shape()', () => {
		let isUserData = om.object.shape({
			name: om.string,
			age: om.number.or.vacuum
		});

		expect(isUserData({})).to.false;
		expect(isUserData({ age: 1 })).to.false;
		expect(isUserData({ name: 1 })).to.false;
		expect(isUserData({ name: 'Иванушка' })).to.true;
		expect(isUserData({ name: 'Иванушка', age: 1 })).to.true;
		expect(isUserData({ name: 'Иванушка', age: null })).to.true;
		expect(isUserData({ name: 'Иванушка', age: '1' })).to.false;
		expect(isUserData({ name: 'Иванушка', age: 1, friends: [] })).to.false;
	});

	it('om.object.partialShape()', () => {
		let isUserData = om.object.partialShape({
			name: om.string,
			age: om.number.or.vacuum
		});

		expect(isUserData({ name: 'Иванушка', age: 1, friends: [] })).to.true;
	});

	it('om.object.values()', () => {
		let isObjectWithNumericValues = om.object.values(om.number);

		expect(isObjectWithNumericValues({ a: 1, b: 2, c: 3 })).to.true;
		expect(isObjectWithNumericValues({ a: 1, b: 2, c: '3' })).to.false;
		expect(isObjectWithNumericValues({ a: 1, b: 2, c: null })).to.false;
		expect(isObjectWithNumericValues({ a: 1, b: 2, c: undefined })).to.false;
	});

	it('om.function', () => {
		let isFunction = om.function;

		expect(isFunction({})).to.false;
		expect(isFunction(() => {})).to.true;
	});

	it('om.map', () => {
		let isMap = om.map;

		expect(isMap({})).to.false;
		expect(isMap(new Map())).to.true;
	});

	it('om.set', () => {
		let isSet = om.set;

		expect(isSet({})).to.false;
		expect(isSet(new Set())).to.true;
	});

	it('om.date', () => {
		let isDate = om.date;

		expect(isDate({})).to.false;
		expect(isDate(new Date())).to.true;
	});

	it('om.date.before()', () => {
		let now = Date.now();
		let isDateBeforeNow = om.date.before(new Date(now));

		expect(isDateBeforeNow(new Date(now))).to.false;
		expect(isDateBeforeNow(new Date(now - 100))).to.true;
		expect(isDateBeforeNow(new Date(now + 100))).to.false;
	});

	it('om.date.after()', () => {
		let now = Date.now();
		let isDateAfterNow = om.date.after(new Date(now));

		expect(isDateAfterNow(new Date(now))).to.false;
		expect(isDateAfterNow(new Date(now - 100))).to.false;
		expect(isDateAfterNow(new Date(now + 100))).to.true;
	});

	it('om.date.after()', () => {
		let isDate = om.date;

		expect(isDate({})).to.false;
		expect(isDate(new Date())).to.true;
	});

	it('om.regExp', () => {
		let isRegExp = om.regExp;

		expect(isRegExp({})).to.false;
		expect(isRegExp(/a/)).to.true;
	});

	it('om.promise', () => {
		let isPromise = om.promise;

		expect(isPromise({})).to.false;
		expect(isPromise(Promise.resolve())).to.true;
	});

	it('om.error', () => {
		let isError = om.error;

		expect(isError({})).to.false;
		expect(isError(new Error())).to.true;
		expect(isError(new TypeError())).to.true;
	});
});
