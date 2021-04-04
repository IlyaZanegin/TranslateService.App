import { Injectable, Inject } from '@angular/core';
import { IElementStorage } from '@models';
import { StorageService } from '../storage.service'
import { Guid } from "guid-typescript";

@Injectable({ providedIn: 'root' })
export class StorageBrowserService extends StorageService {

  Create(element: IElementStorage) {
    localStorage.setItem(Guid.create().toString(), JSON.stringify(element));
  }
}
