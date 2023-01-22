import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { GitHubUser, searchUsers } from './api/github-users.service';

import './environment';

import './app.element.scss';
import './components/github-user.element';

@customElement('environments-with-zod-root')
export class AppElement extends LitElement {
  private pageTitle = 'validate env with zod';

  @state()
  declare _users: GitHubUser[];

  @state()
  declare abortRequestController: AbortController;

  constructor() {
    super();
    this._users = [];
  }

  private async _onSearchInput(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;

    if (this.abortRequestController) this.abortRequestController.abort();
    const abortRequestController = new AbortController();
    await searchUsers(target.value, {
      abortController: abortRequestController,
    }).then((users) => {
      this._users = users;
    });
  }

  private renderUser(users: GitHubUser[]) {
    return repeat(
      users,
      (user) => user.id,
      (user: GitHubUser) => html`<github-user
        .image=${user.avatar_url}
        .name=${user.login}
        .userId=${user.id}
      ></github-user>`
    );
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="container">
          <!--  WELCOME  -->
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome to ${this.pageTitle} 👋
            </h1>
          </div>

          <div id="content">
            <div id="search">
              <form>
                <label for="search">Search for a user</label>
                <input
                  type="text"
                  placeholder="Search for a user"
                  @input=${this._onSearchInput}
                />
              </form>
            </div>

            <div id="users">${this.renderUser(this._users)}</div>
          </div>
        </div>
      </div>
    `;
  }
}
