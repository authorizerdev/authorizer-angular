import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizerContextService } from 'authorizer-angular';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public contextService: AuthorizerContextService,
    public router: Router
  ) {}
  token: any;
  canActivate(): boolean {
    this.contextService.getState().subscribe((state) => {
      this.token = state.token;
    });
    if (!this.token) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
