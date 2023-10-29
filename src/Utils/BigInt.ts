const min = (a: bigint, b: bigint) => (a < b ? a : b);

const max = (a: bigint, b: bigint) => (a > b ? a : b);

export const BigIntMath = {
  min,
  max,
};
