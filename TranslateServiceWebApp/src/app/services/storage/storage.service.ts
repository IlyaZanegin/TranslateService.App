import { Injectable } from '@angular/core';
import { IElementStorage } from '@models';

@Injectable({ providedIn: 'root' })
export abstract class StorageService {
  constructor() { }
  abstract Create(element: IElementStorage);
}
