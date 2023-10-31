import * as _ from 'lodash';

type Enum = Record<string, number | string>;

export const initFromEnum = <A extends Enum, B extends object | number | boolean | string>(
  enumType: A,
  defaultValue: B | ((val: A[keyof A]) => B),
): Record<A[keyof A], B> => {
  const enumObject = {} as Record<A[keyof A], B>;

  _.forEach(enumType, (value: A[keyof A]) => {
    if (typeof defaultValue === 'function') {
      enumObject[value] = defaultValue(value);
    } else {
      enumObject[value] = defaultValue;
    }
  });

  return enumObject;
};

export const formatNumber = (number: number, showSmallDigitNumber?: boolean): string => {
  if (number < 1e3) {
    return number.toFixed(showSmallDigitNumber ? 2 : 0);
  }

  if (number < 1e6) {
    return (number / 1e3).toFixed(2) + 'K';
  }

  return number.toExponential(3);
};
