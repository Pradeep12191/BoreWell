import { Component, OnInit } from '@angular/core';
import { FADE_IN_ANIMATION } from '../animations';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [FADE_IN_ANIMATION]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: null,
      password: null
    })
  }

  onSubmit() {
    const password = this.loginForm.get('password').value;
    console.log(btoa(password))
  }

}
