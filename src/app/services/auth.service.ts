import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(
        private af: AngularFireAuth, 
        private router: Router, 
        private db: AngularFireDatabase
    ){}

    isAuthenticated() {
        if (this.af.auth.currentUser !== null) {
            return true;
        } else {
            return false;
        }
    }
    
    signOut(): void {
        this.af.auth.signOut();
    }

    signIn(email, pass): Promise<void> {
        return this.af.auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
            this.router.navigateByUrl('content')
        })
    }

    createUser(email, password, role): Promise<void> {
        return this.af.auth.createUserWithEmailAndPassword(email, password)
        .then(created => {
            this.db.object(created.user.uid).set({
                role: role
            })
        })
        .then(() => {
            this.router.navigateByUrl('auth');
        })
    }
 
}