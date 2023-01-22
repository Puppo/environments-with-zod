import { InjectionToken } from '@angular/core';
import env from './loader';
import { Environments } from './models';

export const ENVIRONMENT = new InjectionToken<Environments>('Environment');

export const registerEnvironment = {
  provide: ENVIRONMENT,
  useValue: env,
};
