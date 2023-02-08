import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false
  constructor(public angularFireAuth : AngularFireAuth) { }

  async signIn (email : string, password : string) {
    await this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  async signUp (email : string, password : string) {
    await this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  logout() {
    this.angularFireAuth.signOut();
    localStorage.removeItem('user');
  }
}
