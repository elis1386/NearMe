import { Component } from '@angular/core';
import { env } from 'src/config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  weatherInfo: any = {};
  WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=60.18608603539844&lon=24.943128762153208&appid=${env.WEATHER_API_KEY}&units=metric`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this.http.get(this.WEATHER_API_URL).subscribe((res: any) => {
      const city = res.city.name;
      const weatherArray = res.list.slice(0, 10);
      // clean up some results
      for (let i = 0; i < weatherArray.length; i++) {
        const element = weatherArray[i];
        element.main.temp = Math.round(element.main.temp);
        element.weather[0].icon = `https://openweathermap.org/img/w/${element.weather[0].icon}.png`;
        /* const times = element.dt_txt.split(' ');
        element.dt_txt = times[1].slice(0, 5); */
        element.dt_txt = element.dt_txt.slice(5, 16);
      }
      this.weatherInfo = {
        city: city,
        weatherArr: weatherArray,
      };
    });
  }
}
