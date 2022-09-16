import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'password-strength-indicator',
  template: `<div>{{ body }}</div>`,
  styles: [],
})
export class PasswordStrengthIndicator implements OnInit {
  @Input() body: string = 'Password Strength Indicator Component';

  constructor() {}

  ngOnInit(): void {}
}
