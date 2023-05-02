import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
  constructor(public authService: AuthService, public auth: AngularFireAuth) {}
}
