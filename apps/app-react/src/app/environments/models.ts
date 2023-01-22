import { z } from 'zod';

const stringToNumber = z
  .string()
  .regex(/^\d+$/, {
    message: 'Must be a number',
  })
  .transform(Number);

export const Environments = z.object({
  VITE_GITHUB_API_URL: z.string().url(),
  VITE_GITHUB_PER_PAGE: stringToNumber,
});

export type Environments = z.infer<typeof Environments>;
