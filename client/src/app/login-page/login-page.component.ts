import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../shared/services/auth.service'
import {Subscription} from 'rxjs'
import {MaterialService} from "../shared/classes/material.service";
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar'
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  hide = true;
  form: any
  aSub = new Subscription



  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar
      ) { }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }

  }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {

      if(params['registered']){
        this.snackBar.open('Success your account is created', 'close')
      }else if(params['accessDenied']){
        this.snackBar.open('you need to log in', 'ok')
      }else if(params['sessionFailed']){
        this.snackBar.open('token has expired you need to log in', 'ok')
      }

    })
  }
  onSubmit(){
     this.form.disable()
   this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/dashboard']),
      error => {
        this.form.enable()
        this.snackBar.open(error.error.message, 'close')
      }
      )
  }
}
