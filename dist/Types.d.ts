import { KEY_STATE } from './constants';
import { I$Validator, IState } from './State';
import { IArrayType } from './types/ArrayType';
import { IDateType } from './types/DateType';
import { IMapType } from './types/MapType';
import { INumberType } from './types/NumberType';
import { IObjectType } from './types/ObjectType';
import { ISetType } from './types/SetType';
import { IStringType } from './types/StringType';
import { IType } from './types/Type';
export interface ITypes {
    [KEY_STATE]: IState;
    not: ITypes;
    custom<T extends IType>(validator: ((value: any) => boolean | string) | I$Validator, _typeProto?: object): T;
    null: IType;
    undefined: IType;
    vacuum: IType;
    boolean: IType;
    number: INumberType;
    string: IStringType;
    symbol: IType;
    object: IObjectType;
    array: IArrayType;
    function: IType;
    func: IType;
    map: IMapType;
    set: ISetType;
    weakMap: IMapType;
    wmap: IMapType;
    weakSet: ISetType;
    wset: ISetType;
    date: IDateType;
    regExp: IType;
    regex: IType;
    promise: IType;
    error: IType;
}
export declare const typesProto: ITypes;
