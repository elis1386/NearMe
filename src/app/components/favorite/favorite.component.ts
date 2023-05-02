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
    this.getAllMyPlace();
  }
  getAllMyPlace() {
    let clientId = JSON.parse(localStorage.getItem("user")!).uid;
    this.requestService.getAllPlaces().subscribe((data) => {
      data.forEach((place) => {
        if (
          clientId === place.userId &&
          !this.myPlaces.some((p) => p.id! === place.id!)
        ) {
          this.myPlaces.push(place);
        }
        console.log(place);
      });
    });
  }

  deleteMyPlace(id: string) {
    let answer = confirm("Do you really want to delete this task?");
    if (answer === true) {
      this.requestService.deletePlace(id);
    }
    this.myPlaces = [];
    this.getAllMyPlace();
  }
}
