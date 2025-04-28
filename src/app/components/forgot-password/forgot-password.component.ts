import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.css"],
    standalone: false
})
export class ForgotPasswordComponent implements OnInit {
  constructor(public authService: AuthService) {}
  ngOnInit() {}
}
