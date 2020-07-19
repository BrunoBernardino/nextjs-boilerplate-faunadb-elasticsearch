import { NextApiRequest } from 'next';

type IsValidJobRequest = (request: NextApiRequest) => boolean;

const JOB_API_KEY = process.env.JOB_API_KEY || 'NOPE';

export const isValidJobRequest: IsValidJobRequest = (request) => {
  if (!Object.prototype.hasOwnProperty.call(request.headers, 'authorization')) {
    return false;
  }

  if (
    JOB_API_KEY !== 'NOPE' &&
    request.headers.authorization === `Bearer ${JOB_API_KEY}`
  ) {
    return true;
  }

  return false;
};
