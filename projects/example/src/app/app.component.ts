import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'example';
  stateChangeCallback = async (state: any) => {
    console.log('state change from client ==>> ', state);
  };
}
