import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {

  randomPhoto = "https://source.unsplash.com/random/?restaurant/300x100"
  isVisable: boolean = false
}
