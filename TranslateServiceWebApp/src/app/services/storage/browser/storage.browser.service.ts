import { Injectable, Inject } from '@angular/core';
import { IElementStorage } from '@models';
import { StorageService } from '../storage.service'
import { Guid } from "guid-typescript";

@Injectable({ providedIn: 'root' })
export class StorageBrowserService extends StorageService {
  create(element: IElementStorage) {
    localStorage.setItem(Guid.create().toString(), JSON.stringify(element));
  }

  getAll(): IElementStorage[] {
    const elements: IElementStorage[] = [];
    
    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue;
      }

      const item = JSON.parse(localStorage.getItem(key)) as IElementStorage;
      elements.push(item);
    }

    return elements;
  }
}
