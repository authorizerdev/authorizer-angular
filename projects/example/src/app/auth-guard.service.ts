import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizerContextService } from 'authorizer-angular';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public contextService: AuthorizerContextService,
    public router: Router
  ) {
    contextService
      .getState()
      .pipe()
      .subscribe((state) => {
        this.token = state.token;
      });
  }
  token: any;
  canActivate(): boolean {
    if (!this.token) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
