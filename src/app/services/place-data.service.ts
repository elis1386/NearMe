import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PlaceDataService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(
      "https://open-api.myhelsinki.fi/v1/events/?language_filter=fi&limit=10"
    );
  }
}
