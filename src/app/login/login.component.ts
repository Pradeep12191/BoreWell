import { Component, OnInit } from '@angular/core';
import { FADE_IN_ANIMATION } from '../animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [FADE_IN_ANIMATION]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  onLogin;
  loginUrl;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private config: ConfigService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    const apiUrl = this.config.getConfig('apiUrl');
    const url = this.config.getUrl('auth');
    this.loginUrl = apiUrl + url;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onSubmit() {
    if(this.loginForm.invalid){
      return;
    }
    const password = this.loginForm.get('password').value;
    const username = this.loginForm.get('username').value;

    this.onLogin = true;
    this.loginForm.get('password').disable();
    this.loginForm.get('username').disable();
    this.auth.username = username;
    this.auth.password = password;
    this.auth.token = this.auth.createToken(username, password);
    this.http.get(this.loginUrl).subscribe(() => {
      this.auth.password = null;    
      this.router.navigate(['postlogin', 'dashboard'])
    }, (err: HttpErrorResponse) => {
      this.onLogin = false;
      this.loginForm.get('password').enable();
      this.loginForm.get('username').enable();
      this.auth.username = null;
      this.auth.password = null;
      this.auth.token = null;
      if(err.status === 403){
        this.toastr.error('Username / Password is not valid.', 'Error', { timeOut: 2000 })
      }
      
    })

  }

}
