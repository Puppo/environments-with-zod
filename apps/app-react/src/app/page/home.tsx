import { GitHubUser } from '@environments-with-zod/api/github';
import { useEffect, useState } from 'react';
import { useGithub } from '../api/useGithub';
import GithubUser from '../components/GithubUser';

import './home.scss';

export function Home() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const { searchUsers } = useGithub()

  useEffect(() => {
    if (!query) {
      setUsers([])
      return;
    }
    const abortController = new AbortController()
    searchUsers(query, {
      abortController
    })
      .then((result) => {
        setUsers(result)
      });

    return () => {
      abortController.abort()
    }
  }, [query])


  return (
    <div className="wrapper">
      <div className="container">

        <div id="welcome">
          <h1>
            <span> Hello there, </span>
            Welcome to validate env with zod 👋
          </h1>
        </div>

        <div id="content">
          <div id="search">
            <form>
              <label htmlFor='search'>Search for a user: </label>
              <input
                id="search"
                type="text"
                placeholder="Search for a user"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
            </form>
          </div>

          <div id="users">
            {users.map((user) => <GithubUser key={user.id} id={user.id} image={user.avatar_url} name={user.login} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


