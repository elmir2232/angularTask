import { Injectable } from "@angular/core";
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
    constructor(private AuthService: AuthService, private router: Router){}

    canActivate(): boolean {
        if (!this.AuthService.isAuthenticated()) {
            this.router.navigateByUrl('auth');
            return false;
        }
        return true;
    }
}