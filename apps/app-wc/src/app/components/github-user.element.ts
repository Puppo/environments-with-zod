import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('github-user')
export class GitHubUserElement extends LitElement {
  @property()
  declare image: string;

  @property()
  declare name: string;

  @property({ type: Number })
  declare userId: number;

  render() {
    return html`
      <div>
        <img src="${this.image}" alt="user avatar" width="40" height="40" />
        <h2>${this.name}</h2>
        <p>${this.userId}</p>
      </div>
    `;
  }
}
