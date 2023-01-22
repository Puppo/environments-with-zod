import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'github-user',
  template: `<div>
    <img [src]="image" alt="user avatar" width="40" height="40" />
    <h2>{{ name }}</h2>
    <p>{{ userId }}</p>
  </div>`,
})
export class GitHubUserComponent {
  @Input() userId!: number;
  @Input() name!: string;
  @Input() image!: string;
}
