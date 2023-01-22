import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  GitHubUser,
  GitHubUserSearchResponse,
} from '@environments-with-zod/api/github';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENVIRONMENT } from '../environments/provider';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private readonly env = inject(ENVIRONMENT);
  private readonly http = inject(HttpClient);

  getUser(username: string): Observable<GitHubUser[]> {
    const { NX_GITHUB_API_URL, NX_GITHUB_PER_PAGE } = this.env;
    const url = new URL(`${NX_GITHUB_API_URL}/search/users`);
    url.searchParams.set('q', username);
    url.searchParams.set('per_page', NX_GITHUB_PER_PAGE.toString());
    return this.http.get(url.toString()).pipe(
      map((res) => GitHubUserSearchResponse.parse(res)),
      map((res) => res.items)
    );
  }
}
