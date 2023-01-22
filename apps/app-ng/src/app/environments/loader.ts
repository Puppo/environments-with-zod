import { z } from 'zod';
import { ErrorMessageOptions, generateErrorMessage } from 'zod-error';
import { Environments } from './models';

const options: ErrorMessageOptions = {
  delimiter: {
    error: '\n',
  },
  transform: ({ errorMessage, index }) =>
    `Error #${index + 1}: ${errorMessage}`,
};

function ensureEnvironments(): Environments {
  try {
    const environments = Environments.parse(process.env);
    return environments;
  } catch (error) {
    const errors: string[] = [`Invalid environment variables`];
    if (error instanceof z.ZodError)
      errors.push(generateErrorMessage(error.issues, options));
    alert(errors.join('\n'));

    throw error;
  }
}

export default ensureEnvironments();
