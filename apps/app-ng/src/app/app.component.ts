import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GitHubUser } from '@environments-with-zod/api/github';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GitHubService } from './api/github.service';
import { GitHubUserComponent } from './components/github-user.component';

@Component({
  standalone: true,
  imports: [CommonModule, GitHubUserComponent],
  selector: 'zod-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly query = new Subject<string>();
  private readonly query$ = this.query.asObservable();

  readonly users$ = this.query$.pipe(
    switchMap((query) => this.githubService.getUser(query))
  );

  constructor(private readonly githubService: GitHubService) {}

  onQueryType(event: Event) {
    const target = event.target as HTMLInputElement;
    this.query.next(target.value);
  }

  trackByFn(_: number, item: GitHubUser) {
    return item.id;
  }
}
