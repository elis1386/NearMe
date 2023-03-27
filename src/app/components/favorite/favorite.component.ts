import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent {
  public activities_api_url =
    'https://cors-anywhere.herokuapp.com/https://open-api.myhelsinki.fi/v1/activities/';

  randomPhoto = 'https://source.unsplash.com/random/?restaurant/300x100';
  isVisable: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get(this.activities_api_url).subscribe((data) => {
      console.log(data);
    });
  }
}
