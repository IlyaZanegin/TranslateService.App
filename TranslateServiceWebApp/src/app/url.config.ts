import { InjectionToken } from '@angular/core';

export interface IUrlConfig {
  cloudTranslateUrl: string;
}

export const URL_CONFIG = new InjectionToken<IUrlConfig>('url.config');
