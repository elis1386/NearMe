import { HttpClient, HttpClientJsonpModule } from "@angular/common/http";
import { Component, Input, NgZone, OnInit } from "@angular/core";
import { Favorite } from "src/app/models/favorite";
import { RequestsService } from "src/app/services/requests.service";

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
  userId!: string;
  myPlace: Favorite[] = [];

  constructor(
    public httpClient: HttpClient,
    public requestService: RequestsService
  ) {}

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
    this.requestService.getAllPlaces();
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
      fields: [
        "name",
        "formatted_address",
        "photos",
        "rating",
        "icon",
        "place_id",
      ],
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
      content.className = "info-box";
      content.innerHTML += `
      <section class="show-info" *ngIf="current_place !== 0">
      <h4 class="info-title">${this.current_place.name}</h4>
      <img class="info-photo" src="${this.current_place.photos[0].getUrl()}" alt=""  />
      <p class="info-address">${this.current_place.vicinity}</p>
      <div class="rating">
      <p class="info-rating">${this.current_place.rating}</p>
      </div>
      </section>
      `;
      const btn = document.createElement("button");
      btn.textContent = "Favorite";
      btn.className = "favorite";
      btn?.addEventListener("click", () => {
        this.addToFavorite(this.current_place);
      });
      content.appendChild(btn);
      this.infoWindow = new google.maps.InfoWindow({
        content: content,
      });

      this.infoWindow.open(this.map, marker);
    });
  }

  addToFavorite(place: Favorite) {
    console.log(place);
    this.userId = JSON.parse(localStorage.getItem("user")!).uid;
    place.userId = this.userId;
    this.requestService.addToFavorite(place);
  }
}
