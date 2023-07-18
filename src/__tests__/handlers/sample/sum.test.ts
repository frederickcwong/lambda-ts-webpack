import { handler } from '@handlers/sample/sum';
import type { APIGatewayProxyEvent } from 'aws-lambda';
import { mock } from 'jest-mock-extended';

interface InputType {
  a: number;
  b: number;
}

interface EachInputType {
  n: string;
  e: APIGatewayProxyEvent;
}

describe('Test suite for lambda function - SampleFunction', () => {
  const gdEventMock = mock<APIGatewayProxyEvent>();
  gdEventMock.body = JSON.stringify({ a: 3, b: 4 });

  const bdEventMock = mock<APIGatewayProxyEvent>();
  bdEventMock.body = JSON.stringify({ a: 'abc', b: 'def' });

  const veryBadMock = mock<APIGatewayProxyEvent>();
  veryBadMock.body = null;

  const inputs: EachInputType[] = [
    { n: 'good', e: gdEventMock },
    { n: 'bad', e: bdEventMock },
    { n: 'very bad', e: veryBadMock },
  ];

  it.each(inputs)(`$n input should return statusCode 200`, async ({ n, e }) => {
    const expected = { statusCode: 200 };
    const actual = await handler(e);
    expect(actual).toMatchObject(expected);
  });

  it('good input expects returning 7 in response body', async () => {
    const obj = JSON.parse(gdEventMock.body ?? '');
    const { a, b } = obj as InputType;
    const expected = { body: `Yay! Lambda's working. The sum of ${a} and ${b} is ${a + b}` };
    const actual = await handler(gdEventMock);
    expect(actual).toMatchObject(expected);
  });

  it('bad input expects returning errors in response body', async () => {
    const expected = {
      body: 'Yay! Lambda\'s working, but the API is not because: "a" is missing or not a number, "b" is missing or not a number',
    };
    const actual = await handler(bdEventMock);
    expect(actual).toMatchObject(expected);
  });

  it('very bad input expects returning errors in response body', async () => {
    const expected = {
      body: 'Yay! Lambda\'s working, but the API is not because: "a" is missing or not a number, "b" is missing or not a number',
    };
    const actual = await handler(veryBadMock);
    expect(actual).toMatchObject(expected);
  });
});
