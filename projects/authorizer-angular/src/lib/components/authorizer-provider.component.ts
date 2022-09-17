import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthorizerContextService } from '../authorizer-context.service';

@Component({
  selector: 'authorizer-provider',
  template: `<ng-content></ng-content>`,
  styles: [],
})
export class AuthorizerProvider implements OnInit, OnChanges {
  @Input() config: Record<string, any> = {};
  @Input() onStateChangeCallback?: Function;

  state: Record<string, any> = {};

  constructor(private contextService: AuthorizerContextService) {
    contextService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.contextService.setState({
    //     ...this.state,
    //     user: 'anik',
    //   });
    // }, 2000);
  }

  ngOnChanges(state: any): void {
    if (this.state && this.onStateChangeCallback) {
      this.onStateChangeCallback(this.state);
    }
  }
}
