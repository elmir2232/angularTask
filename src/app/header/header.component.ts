import { Component, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: []
})
export class HeaderComponent implements OnInit {

  logged: boolean;
  link: any;

  constructor(private af: AngularFireAuth, private router: Router, private authService: AuthService) { }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl('auth');
    this.logged = false;
  }

  ngOnInit() {
    this.af.authState.subscribe(state => {
      state ? this.logged = true : this.logged = false;
    });
  }
}
