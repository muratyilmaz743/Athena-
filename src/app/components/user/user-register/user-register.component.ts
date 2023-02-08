import {Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {FirebaseService} from "../../../services/firebase.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit{
  isSignedIn = false;


  constructor(private db: AngularFireDatabase, public firebaseService: FirebaseService) { }

  async onSignup() {
    var email = (document.getElementById("email") as HTMLInputElement)?.value;
    var password = (document.getElementById("password") as HTMLInputElement)?.value;
    await this.firebaseService.signUp(email, password)
  }

  ngOnInit(): void {
  }
}
