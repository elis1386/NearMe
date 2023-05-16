import { Component, OnInit, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthService } from "src/app/services/auth.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  imgUrl = "assets/logoNM2.png";
  isLogged: boolean = false;
  user: any;
  currentUser: any;
  currentRoute: any;

  constructor(
    public authService: AuthService,
    public auth: AngularFireAuth,
    public database: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.updateUser();
  }

  updateUser() {
    let loggedUser = JSON.parse(localStorage.getItem("user")!);
    this.currentUser = loggedUser;

    setInterval(() => {
      let updatedUser = JSON.parse(localStorage.getItem("user")!);
      if (JSON.stringify(this.currentUser) !== JSON.stringify(updatedUser)) {
        this.currentUser = updatedUser;
      }
    }, 1000);
  }
}
