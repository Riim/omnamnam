import { addTypeValidators } from '../addTypeValidators';
import { isNonZeroLength } from '../lib/utils';
import { validationState } from '../validationState';
import { IType, TValidator, typeProto } from './Type';

export interface IArrayType extends IType {
	of(validator: TValidator): IArrayType;
	len(value: number): IArrayType;
	minLen(value: number): IArrayType;
	maxLen(value: number): IArrayType;
	nonEmpty: IArrayType;
}

function cb(this: TValidator, item: any, index: number): boolean {
	let prevKeypath = validationState.currentKeypath;
	validationState.currentKeypath = validationState.currentKeypath + `[${index}]`;

	let result = this(item);

	if (!result && !validationState.errorKeypatch) {
		validationState.errorKeypatch = validationState.currentKeypath;
	}

	validationState.currentKeypath = prevKeypath;

	return result;
}

export const arrayTypeProto: Object = {
	__proto__: typeProto,

	of(validator: TValidator): IArrayType {
		return addTypeValidators(this, true, {
			validator: (arr: Array<any>) => arr.every(cb, validator)
		});
	},

	len(value: number): IArrayType {
		return addTypeValidators(this, true, { validator: (arr: Array<any>) => arr.length == value });
	},

	minLen(value: number): IArrayType {
		return addTypeValidators(this, true, {
			validator: (arr: Array<any>) => arr.length >= value
		});
	},

	maxLen(value: number): IArrayType {
		return addTypeValidators(this, true, {
			validator: (arr: Array<any>) => arr.length <= value
		});
	},

	get nonEmpty(): IArrayType {
		return addTypeValidators(this, true, { validator: isNonZeroLength });
	}
};
