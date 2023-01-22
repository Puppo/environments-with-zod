import {
  GitHubUser,
  GitHubUserSearchResponse,
} from '@environments-with-zod/api/github';
import { useEnv } from '../environments';

interface GitHubService {
  searchUsers(
    query: string,
    opts?: {
      abortController?: AbortController;
    }
  ): Promise<GitHubUser[]>;
}

export function useGithub(): GitHubService {
  const env = useEnv();

  function searchUsers(
    query: string,
    opts?: {
      abortController?: AbortController;
    }
  ): Promise<GitHubUser[]> {
    const { VITE_GITHUB_API_URL, VITE_GITHUB_PER_PAGE } = env;
    const url = new URL(`${VITE_GITHUB_API_URL}/search/users`);
    url.searchParams.set('q', query);
    url.searchParams.set('per_page', VITE_GITHUB_PER_PAGE.toString());
    return fetch(url.toString(), {
      signal: opts?.abortController?.signal,
    })
      .then((response) => response.json())
      .then((response) => GitHubUserSearchResponse.parse(response))
      .then((response) => response.items);
  }

  return {
    searchUsers,
  };
}
