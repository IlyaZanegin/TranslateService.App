import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class HandleService {
  private readonly defaultError = 'Unknown error. Please contact the administrator';
  private readonly unauthorizedError = 'Unauthorized error. Please update yout token';

  constructor() {}

  errorHandle = (response: any) => {
    if (response && response as HttpErrorResponse) {
      if (response.status === 401) {
        return throwError({ message: this.unauthorizedError });
      }
    }
    return throwError({ message: this.defaultError });
  }
}
