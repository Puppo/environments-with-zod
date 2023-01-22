import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GitHubUser,
  GitHubUserSearchResponse,
} from '@environments-with-zod/api/github';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import env from '../environments';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  constructor(private readonly http: HttpClient) {}

  getUser(username: string): Observable<GitHubUser[]> {
    const { NX_GITHUB_API_URL, NX_GITHUB_PER_PAGE } = env;
    const url = new URL(`${NX_GITHUB_API_URL}/search/users`);
    url.searchParams.set('q', username);
    url.searchParams.set('per_page', NX_GITHUB_PER_PAGE.toString());
    return this.http.get(url.toString()).pipe(
      map((res) => GitHubUserSearchResponse.parse(res)),
      map((res) => res.items)
    );
  }
}
