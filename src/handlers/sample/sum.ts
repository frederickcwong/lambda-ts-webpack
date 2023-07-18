import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { sum } from '@src/utils/math';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event?.body ?? '{}');
  let a = NaN;
  let b = NaN;
  const errors: string[] = [];
  try {
    a = parseFloat(body?.a);
    if (isNaN(a)) throw new Error();
  } catch (e) {
    errors.push('"a" is missing or not a number');
  }
  try {
    b = parseFloat(body?.b);
    if (isNaN(b)) throw new Error();
  } catch (e) {
    errors.push('"b" is missing or not a number');
  }
  return {
    statusCode: 200,
    body:
      errors.length > 0
        ? `Yay! Lambda's working, but the API is not because: ${errors.join(', ')}`
        : `Yay! Lambda's working. The sum of ${a} and ${b} is ${+sum(a, b)}`,
  };
};
