import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service'
import {Subscription} from 'rxjs'
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  hide = true;
  form: any
  aSub = new Subscription
  constructor(private auth: AuthService,
              private router: Router,
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
  }
  onSubmit(){
    this.form.disable
   this.aSub = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      },
      error => {
        this.snackBar.open(error.error.message, 'close')
        this.form.enable()
      }
      )
  }
}
