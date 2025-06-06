import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-sign-in",
    templateUrl: "./sign-in.component.html",
    styleUrls: ["./sign-in.component.css"],
    standalone: false
})
export class SignInComponent {
  signInForm: FormGroup;
  firebaseErrorMessage: boolean = false;

  constructor(private router: Router, public authService: AuthService) {
    this.signInForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
  }

  signIn() {
    if (this.signInForm.invalid) {
      return this.signInForm.markAllAsTouched()
    }

    this.authService
      .SignIn(this.signInForm.value.email, this.signInForm.value.password)
      .then((result) => {
        if (result == null) {
        } else if (result.isValid == false) {
          alert("Your login or password are incorrect. Please try again.");
         
        }
      })
      .catch(() => {
      });
  }
}
