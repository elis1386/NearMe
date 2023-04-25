import { HttpClient, HttpClientJsonpModule } from "@angular/common/http";
import { Component, Input, NgZone, OnInit } from "@angular/core";
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  mapLoaded!: boolean;
  map!: google.maps.Map;
  geocoder = new google.maps.Geocoder();
  service!: google.maps.places.PlacesService;
  infoWindow!: google.maps.InfoWindow;
  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    center: {
      lat: 60.18608603539844,
      lng: 24.943128762153208,
    },
    zoom: 15,
  };
  placesResult: any = [];
  current_place: any = 0;

  constructor(public httpClient: HttpClient) {}

  ngOnInit() {
    this.map = new google.maps.Map(
      document.getElementById("map")!,
      this.options
    );
    this.service = new google.maps.places.PlacesService(this.map);
    this.infoWindow = new google.maps.InfoWindow();
  }

  reset() {
    this.map = new google.maps.Map(
      document.getElementById("map")!,
      this.options
    );
  }

  showPlaces(type: string) {
    this.reset();
    const searchRequest: google.maps.places.PlaceSearchRequest = {
      type: type,
      radius: 1000,
      location: this.options.center!,
    };
    this.service.nearbySearch(searchRequest, (results, status) => {
      if (
        status !== google.maps.places.PlacesServiceStatus.OK ||
        results === null
      ) {
        return;
      }

      this.placesResult = results;
      console.log(this.placesResult);

      for (let i = 0; i < results.length!; i++) {
        const place = results[i];
        const marker = new google.maps.Marker({
          position: results[i].geometry?.location,
          map: this.map,
        });
        google.maps.event.addListener(marker, "click", () =>
          this.showInfo(place, marker)
        );
      }
    });
  }

  showInfo(place: google.maps.places.PlaceResult, marker: google.maps.Marker) {
    const detailsRequest = {
      placeId: place.place_id!,
      fields: ["name", "formatted_address", "photos", "rating", "icon"],
    };
    this.current_place = place;
    console.log(place);
    this.service.getDetails(detailsRequest, (place, status) => {
      if (
        status !== google.maps.places.PlacesServiceStatus.OK ||
        place === null
      ) {
        return;
      }

      const content = document.createElement("div");
      content.innerHTML += `
      <section class="show-info" *ngIf="current_place !== 0">
      <h4 class="info-title">${this.current_place.name}</h4>
      <img class="info-photo" src="${this.current_place.photos[0].getUrl()}" alt=""  />
      <p class="info-address">${this.current_place.vicinity}</p>
      <div class="rating">
      <p class="info-rating">${this.current_place.rating}</p>
      <figure class="favorite">
        <a><i class="bi bi-heart"></i></a>
      </figure>
      </div>
      </section>
      `;

      this.infoWindow = new google.maps.InfoWindow({
        content: content,
      });
      /*   this.infoWindow.setContent(content); */

      this.infoWindow.open(this.map, marker);
    });
  }
}
