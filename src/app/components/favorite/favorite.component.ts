import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent {
  /* favorites array just for testing purpose */
  public favorites = [
    {
      img: 'https://source.unsplash.com/random/?restaurant/300x100',
      title: 'Title 1',
      description: 'Description about place here',
      address: 'Address 5 16A',
    },
    {
      img: 'https://source.unsplash.com/random/?bar/300x100',
      title: 'Title 2',
      description: 'Description about place here',
      address: 'Address 5 16A',
    },
    {
      img: 'https://source.unsplash.com/random/?restaurant/',
      title: 'Title 3',
      description: 'Description about place here',
      address: 'Address 5 16A',
    },
    {
      img: 'https://source.unsplash.com/random/?restaurant/300x100',
      title: 'Title 1',
      description: 'Description about place here',
      address: 'Address 5 16A',
    },
    {
      img: 'https://source.unsplash.com/random/?bar/300x100',
      title: 'Title 2',
      description: 'Description about place here',
      address: 'Address 5 16A',
    },
    {
      img: 'https://source.unsplash.com/random',
      title: 'Title 3',
      description: 'Description about place here',
      address: 'Address 5 16A',
    },
  ];

  isVisable: boolean = false;

  constructor() {}
}
