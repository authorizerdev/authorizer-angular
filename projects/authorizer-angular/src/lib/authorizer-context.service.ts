import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizerContextService {
  constructor() {}

  private state$ = new BehaviorSubject<any>('initialState');

  setState(myChange: any) {
    this.state$.next(myChange);
  }

  getState() {
    return this.state$.asObservable();
  }
}
