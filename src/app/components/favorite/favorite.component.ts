import { Component, OnInit } from "@angular/core";
import { Favorite } from "src/app/models/favorite";
import { RequestsService } from "src/app/services/requests.service";

@Component({
  selector: "app-favorite",
  templateUrl: "./favorite.component.html",
  styleUrls: ["./favorite.component.css"],
})
export class FavoriteComponent implements OnInit {
  isVisable: boolean = false;
  myPlaces: Favorite[] = [];
  constructor(public requestService: RequestsService) {}

  ngOnInit() {
    this.myPlaces = [];
    let clientId = JSON.parse(localStorage.getItem("user")!).uid;
    this.requestService.getAllPlaces().subscribe((data) => {
      data.forEach((place) => {
        if (clientId === place.userId) {
          this.myPlaces.push(place);
        }
      });
    });
  }

/*   removeFavorite() {
    // TODO: have to remove from backend aswell
    // pass id instead? pass title just for testing
    this.myPlaces.filter((place) => place.name !== place.name);
  } */
}
