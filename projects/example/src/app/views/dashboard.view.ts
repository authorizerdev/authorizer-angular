import { Component } from '@angular/core';
import { AuthorizerContextService } from 'authorizer-angular';

@Component({
  selector: 'dashboard-view',
  template: `
    <div>
      <h1>Hey 👋,</h1>
      <p>Thank you for joining Authorizer demo app.</p>
      <p>
        Your email address is
        <a href="mailto: {{ state['user']?.email }}" style="color: #3B82F6;">
          {{ state['user']?.email }}
        </a>
      </p>
      <br />
      <ng-container *ngIf="state['loading']; else logout_text">
        <h3>Processing....</h3>
      </ng-container>
      <ng-template #logout_text>
        <h3 style="color: #3B82F6; cursor: pointer;" (click)="logoutHandler()">
          Logout
        </h3>
      </ng-template>
    </div>
  `,
  styles: [],
})
export class DashboardView {
  constructor(private contextService: AuthorizerContextService) {
    contextService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  state: Record<string, any> = {};

  async logoutHandler() {
    await this.state['logout']();
    window.location.assign('/');
  }
}
