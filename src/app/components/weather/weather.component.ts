import { Component } from "@angular/core";
import { env } from "src/keys";
import { HttpClient } from "@angular/common/http";
import { Weather_res, Weather_info } from "src/app/models/weather";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"],
})
export class WeatherComponent {
  weatherInfo: Partial<Weather_info> = {};
  WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=60.18608603539844&lon=24.943128762153208&appid=${env.WEATHER_API_KEY}&units=metric`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this.http.get<Weather_res>(this.WEATHER_API_URL).subscribe((res) => {
      const city = res.city.name;
      const weatherArray = res.list.slice(0, 10);
      // clean up some results
      for (let i = 0; i < weatherArray.length; i++) {
        const element = weatherArray[i];
        element.main.temp = Math.round(element.main.temp);
        element.weather[0].icon = `https://openweathermap.org/img/w/${element.weather[0].icon}.png`;
        element.dt_txt = element.dt_txt.slice(10, 16);
      }
      this.weatherInfo = {
        city: city,
        weatherArr: weatherArray,
      };
    });
  }
}
