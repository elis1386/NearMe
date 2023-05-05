import { Injectable, NgZone } from "@angular/core";
import { User } from "../models/user";
import * as auth from "firebase/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import firebase from "firebase/compat/app";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  userRef!: AngularFirestoreCollection<User>;
  userData: any;
  user: any;
  userLoggedIn: boolean = false;

  constructor(
    public database: AngularFirestore,
    public auth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.auth.authState.subscribe((user) => {
      this.userLoggedIn = false;
      if (user) {
        this.userLoggedIn = true;
      } else {
        localStorage.setItem("user", "null");
        JSON.parse(localStorage.getItem("user")!);
        this.userLoggedIn = false;
      }
      this.userRef = this.database.collection<User>("users");
    });
  }

  //Sign in method
  SignIn(email: string, password: string): Promise<any> {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Auth service: loginUser: success");
        this.getUserData().then(() => {
          this.router.navigate(["/map"]);
        });
      })
      .catch((error) => {
        console.log("Auth service: login error...");
        console.log("error code", error.code);
        console.log("error", error);
        if (error.code) return { isValid: false, message: error.message };
        return error.message;
      });
  }

  //Sign Up method
  SignUp(user: any) {
    return this.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();
        result.user?.sendEmailVerification();
        const userData: User = {
          uid: result.user!.uid,
          firstName: user.firstName,
          lastName: user.lastName,
          email: emailLower,
        };

        this.SetUserData(userData);
      })
      .catch((error) => {
        if (error.code) return { isValid: false, message: error.message };
        return error.message;
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.auth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(["verify-email-address"]);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Setting up user data when sign in with username/password in database
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.database.doc(
      `users/${user.uid}`
    );
    return userRef.set(user);
  }
  getUserData() {
    return firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          this.user = doc.data();
          localStorage.setItem("user", JSON.stringify(doc.data()));
          JSON.parse(localStorage.getItem("user")!);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
  // Sign out
  SignOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["sign-in"]);
    });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert("Password reset email sent, check your inbox.");
        passwordResetEmail = "";
        this.router.navigate(["sign-in"]);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}
