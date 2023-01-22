import { z } from 'zod';

const GitHubUser = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.string(),
  url: z.string(),
  repos_url: z.string(),
  type: z.union([z.literal('User'), z.literal('Organization')]),
});

export type GitHubUser = z.infer<typeof GitHubUser>;

export const GitHubUserSearchResponse = z.object({
  items: z.array(GitHubUser),
  total_count: z.number(),
});

type GitHubUserSearchResponse = z.infer<typeof GitHubUserSearchResponse>;
