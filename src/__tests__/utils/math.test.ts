import { sum, sub, mul, div } from '@utils/math';

describe('Math utils test suite', () => {
  test('sum(3, 4) should return 7', () => {
    const actual = sum(3, 4);
    expect(actual).toBe(7);
  });
  test('sub(4, 3) should return 1', () => {
    const actual = sub(4, 3);
    expect(actual).toBe(1);
  });
  test('mul(4,3) to be 12', () => {
    const actual = mul(4, 3);
    expect(actual).toBe(12);
  });
  test('div(3,4) to be 0.75', () => {
    const actual = div(3, 4);
    expect(actual).toBe(0.75);
  });
});
