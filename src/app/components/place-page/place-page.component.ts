import { Component, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RequestsService } from "src/app/services/requests.service";

@Component({
  selector: "app-place-page",
  templateUrl: "./place-page.component.html",
  styleUrls: ["./place-page.component.css"],
})
export class PlacePageComponent {
  currentPlace: any;
  constructor(
    public requestService: RequestsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.showMoreDetails();
  }
  showMoreDetails() {
    const placeId = this.route.snapshot.paramMap.get("id");
    console.log(placeId);
    this.requestService.getAllPlaces().subscribe((data) => {
      data.forEach((place) => {
        if (place.id === placeId) {
          this.currentPlace = place;
        }
      });
    });
  }

}
