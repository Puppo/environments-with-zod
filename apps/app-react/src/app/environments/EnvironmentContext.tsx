import { createContext, useContext } from 'react';
import env from './loader';
import { Environments } from './models';

const EnvironmentContext = createContext<Environments>(env);

export function EnvironmentProvider({ children }: React.PropsWithChildren) {
  return (
    <EnvironmentContext.Provider value={env}>
      {children}
    </EnvironmentContext.Provider>
  )
}

export function useEnv(): Environments {
  const ctx = useContext(EnvironmentContext);

  if (!ctx) throw new Error('useEnv must be used within a EnvironmentProvider');

  return ctx;
}
