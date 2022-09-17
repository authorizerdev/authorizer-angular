import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'example';
  stateChangeCallback = async (state: any) => {
    console.log('state change from client ==>> ', state);
  };
}
