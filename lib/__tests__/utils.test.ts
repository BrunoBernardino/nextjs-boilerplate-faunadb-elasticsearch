import { isValidJobRequest } from '../utils';

describe('lib/utils', () => {
  it('isValidJobRequest', () => {
    const tests = [
      {
        input: {
          headers: {},
        },
        output: false,
      },
      {
        input: {
          headers: {
            authorization: `Bearer ${process.env.JOB_API_KEY}`,
          },
        },
        output: false, // because the env var won't be set for tests
      },
      {
        input: {
          headers: {
            authorization: 'Bearer fake-token',
          },
        },
        output: false,
      },
      {
        input: {
          headers: {
            authorization: '',
          },
        },
        output: false,
      },
    ];

    for (const test of tests) {
      // @ts-ignore
      const result = isValidJobRequest(test.input);
      expect(result).toEqual(test.output);
    }
  });
});
