import { z } from 'zod';
import { ErrorMessageOptions, generateErrorMessage } from 'zod-error';

const options: ErrorMessageOptions = {
  delimiter: {
    error: '\n',
  },
  transform: ({ errorMessage, index }) =>
    `Error #${index + 1}: ${errorMessage}`,
};

const stringToNumber = z
  .string()
  .regex(/^\d+$/, {
    message: 'Must be a number',
  })
  .transform(Number);

const Environments = z.object({
  VITE_GITHUB_API_URL: z.string().url(),
  VITE_GITHUB_PER_PAGE: stringToNumber,
});

type Environments = z.infer<typeof Environments>;

function ensureEnvironments(): Environments {
  try {
    const environments = Environments.parse(import.meta.env);
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
