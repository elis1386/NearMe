import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    standalone: false
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  firebaseErrorMessage: boolean = false;
  from: any;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(
        '',
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ),
    });
  }

  signUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched()
    }
   this.authService.SignUp(this.signUpForm.value)
   .then((result) => {
    if (result == null) {
      this.router.navigate(['sign-in']);
    }
    return throwError(() =>  new Error('Failed login')); 
  })
  .catch(() => {});
}
}
