
import { EnvironmentProvider } from './environments';

import Home from './page/home';

export function App() {
  return (
    <EnvironmentProvider>
      <Home />
    </EnvironmentProvider>
  );
}

export default App;

