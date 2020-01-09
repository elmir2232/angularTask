import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required] ),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    userRole: new FormControl('user')
  })

  error:any = "";
  loggedEmail: string;
  logged: boolean = true;
  loading: boolean = false;

  constructor(
    private af: AngularFireAuth,
    private authService: AuthService,
  ) {}

  onSubmit() {
    if(this.form.valid) {
      this.loading = true;
      this.authService.createUser(this.form.value.email, this.form.value.password, this.form.value.userRole)
      .catch(err => {
        this.error = err;
        this.loading = false;
      })
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
