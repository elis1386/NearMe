import { Component, Input } from "@angular/core";
import { SimpleChanges } from "@angular/core";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent {
  @Input() placesList: any[] = [];

  addToFavorites(place: any) {
    // TODO: add to favorites logic here
    console.log(place);
  }

  // add ratingArray value to objects so we can loop trough and add stars
  // does this everytime placesList changes
  ngOnChanges(changes: SimpleChanges) {
    for (let i = 0; i < changes["placesList"].currentValue.length; i++) {
      let element = changes["placesList"].currentValue[i];

      if (element.rating) {
        let emptyArr = [];
        let roundedRating = Math.round(element.rating);
        for (let j = 0; j < roundedRating; j++) {
          const rating = j;
          emptyArr.push(rating);
        }
        element.ratingArray = emptyArr;
      }
    }
  }
}
