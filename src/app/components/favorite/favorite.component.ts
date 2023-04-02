import { Component } from "@angular/core";
import { Favorite } from "src/app/models/favorite";

@Component({
  selector: "app-favorite",
  templateUrl: "./favorite.component.html",
  styleUrls: ["./favorite.component.css"],
})
export class FavoriteComponent {
  /* favorites array just for testing purpose */
  public favorites: Favorite[] = [
    {
      img: "https://source.unsplash.com/random/?restaurant/300x100",
      title: "Title 1",
      description: "Description about place here",
      address: "Address 5 16A",
    },
    {
      img: "https://source.unsplash.com/random/?bar/300x100",
      title: "Title 2",
      description: "Description about place here",
      address: "Address 5 16A",
    },
    {
      img: "https://source.unsplash.com/random/?restaurant/",
      title: "Title 3",
      description: "Description about place here",
      address: "Address 5 16A",
    },
    {
      img: "https://source.unsplash.com/random/?restaurant/300x100",
      title: "Title 4",
      description: "Description about place here",
      address: "Address 5 16A",
    },
    {
      img: "https://source.unsplash.com/random/?bar/300x100",
      title: "Title 5",
      description: "Description about place here",
      address: "Address 5 16A",
    },
    {
      img: "https://source.unsplash.com/random",
      title: "Title 6",
      description: "Description about place here",
      address: "Address 5 16A",
    },
  ];

  isVisable: boolean = false;

  removeFavorite(title: string) {
    // TODO: have to remove from backend aswell
    // pass id instead? pass title just for testing
    this.favorites = this.favorites.filter(
      (favorite) => favorite.title !== title
    );
  }
}
