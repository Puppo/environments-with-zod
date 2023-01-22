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

const GitHubUserSearchResponse = z.object({
  items: z.array(GitHubUser),
  total_count: z.number(),
});

type GitHubUserSearchResponse = z.infer<typeof GitHubUserSearchResponse>;

export function searchUsers(
  query: string,
  opts?: {
    abortController?: AbortController;
  }
): Promise<GitHubUser[]> {
  const url = new URL(`${import.meta.env.VITE_GITHUB_API_URL}/search/users`);
  url.searchParams.set('q', query);
  url.searchParams.set(
    'per_page',
    import.meta.env.VITE_GITHUB_PER_PAGE.toString()
  );
  return fetch(url.toString(), {
    signal: opts?.abortController?.signal,
  })
    .then((response) => response.json())
    .then((response) => GitHubUserSearchResponse.parse(response))
    .then((response) => response.items);
}
