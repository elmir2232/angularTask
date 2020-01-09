import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})

export class AuthPageComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required] ),
    password: new FormControl('', [Validators.minLength(6), Validators.required])
  })

  error:any = "";
  loggedEmail: string;
  logged: boolean = true;
  loading: boolean = false;

  constructor(
    private af: AngularFireAuth,
    protected authService: AuthService
  ) {}

  onSubmit() {
    if(this.form.valid) {
      this.loading = true;
      this.authService.signIn(this.form.controls.email.value, this.form.controls.password.value)
      .catch(err => { 
        this.error = err;
        this.loading = false;
      });
    }
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnInit() {
    this.af.authState.subscribe(state => {
      if (state !== null) {
        this.logged = true;
        this.loggedEmail = this.af.auth.currentUser.email;
      } else if (state == null) {
        this.logged = false;
        this.loggedEmail = "";
      }
    });
    
  }

}
