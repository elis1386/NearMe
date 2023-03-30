import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/config';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  constructor(private http: HttpClient) {}
  isVisible: boolean = false;
  apiKye: string = 'AIzaSyAp2aFUhqhey1y77f7FBb-7L6KraRxdC1M';
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 60.18608603539844,
    lng: 24.943128762153208,
  };
  weatherInfo: any = {};
  WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.center.lat}&lon=${this.center.lng}&appid=${env.WEATHER_API_KEY}&units=metric`;
  zoom = 13;

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this.http.get(this.WEATHER_API_URL).subscribe((res: any) => {
      const city = res.city.name;
      const weatherArray = res.list.slice(0, 4);
      // clean up some results
      for (let i = 0; i < weatherArray.length; i++) {
        const element = weatherArray[i];
        element.main.temp = Math.round(element.main.temp);
        element.weather[0].icon = `https://openweathermap.org/img/w/${element.weather[0].icon}.png`;
        const times = element.dt_txt.split(' ');
        element.dt_txt = times[1];
      }

      this.weatherInfo = {
        city: city,
        weatherArr: weatherArray,
      };
    });
  }
}
