import { z } from 'zod';

const stringToNumber = z
  .string()
  .regex(/^\d+$/, {
    message: 'Must be a number',
  })
  .transform(Number);

export const Environments = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  NX_GITHUB_API_URL: z.string().url(),
  NX_GITHUB_PER_PAGE: stringToNumber,
});

export type Environments = z.infer<typeof Environments>;
