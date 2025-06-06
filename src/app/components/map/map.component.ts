import { NgIf } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Input, NgZone, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Favorite } from "src/app/models/favorite";
import { RequestsService } from "src/app/services/requests.service";

@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.css"],
    standalone: false
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
    zoom: 14,
  };
  userId!: string;

  placesResult: any = [];
  current_place: any = 0;
  myPlace: Favorite[] = [];

  currentMarker: google.maps.Marker | null = null;
  markers: google.maps.Marker[] = [];

  place: string = "https://source.unsplash.com/random/?user,face/200x200";
  rating: string = " ";
  user: any;

  constructor(
    public httpClient: HttpClient,
    public requestService: RequestsService,
    public auth: AngularFireAuth
  ) {}

  ngOnInit() {
    //Show current geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.options.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.map = new google.maps.Map(
          document.getElementById("map")!,
          this.options
        );
        this.service = new google.maps.places.PlacesService(this.map);
        this.infoWindow = new google.maps.InfoWindow();
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  reset() {
    // Remove all markers from the map
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  showPlaces(type: string) {
    this.reset();

    this.requestService.getAllPlaces();
    const searchRequest: google.maps.places.PlaceSearchRequest = {
      type: type,
      radius: 3000,
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
      for (let i = 0; i < results.length!; i++) {
        const place = results[i];
        const marker = new google.maps.Marker({
          position: results[i].geometry?.location,
          map: this.map,
        });
        google.maps.event.addListener(marker, "click", () =>
          this.showInfo(place, marker)
        );
        this.markers.push(marker); // Keep track of the added marker
      }
    });
  }
  //Under marker custom info from google place web api
  showInfo(place: google.maps.places.PlaceResult, marker: google.maps.Marker) {
    // close the currently opened marker
    if (this.currentMarker) {
      this.currentMarker.setMap(null);
      this.currentMarker = null;
    }

    // open the new marker and set it as the current marker
    const detailsRequest = {
      placeId: place.place_id!,
      fields: [
        "name",
        "formatted_address",
        "photos",
        "rating",
        "icon",
        "place_id",
        "types",
        "opening_hours",
      ],
    };
    this.current_place = place;
    this.service.getDetails(detailsRequest, (place, status) => {
      if (
        status !== google.maps.places.PlacesServiceStatus.OK ||
        place === null
      ) {
        return;
      }
      if (this.current_place.photos) {
        this.place = this.current_place.photos[0].getUrl();
      }
      if (this.current_place.rating) {
        this.rating = `rating:${this.current_place.rating}`;
      }

      const content = document.createElement("div");
      content.className = "info-box";
      content.innerHTML += `
    <section class="show-info" *ngIf="current_place !== 0">
    <h4 class="info-title">${this.current_place.name}</h4>
    <img class="info-photo" src="${this.place}" alt=""  />
    <p class="info-address">${this.current_place.vicinity}</p>
    <div class="rating">
    <p class="info-rating"> ${this.rating}</p>
    </div>
    <div class="d-flex gap-1 flex-wrap d-none">
    <span class="badge text-bg-secondary">
    ${this.current_place.types}
    </span>
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

      this.currentMarker = marker;
      this.infoWindow.open(this.map, marker);
    });
  }

  addToFavorite(place: Favorite) {
    let loggedUser = JSON.parse(localStorage.getItem("user")!);
    if (!loggedUser) {
      alert("If you want to add place in favorite you should sign-in");
    } else {
      this.userId = JSON.parse(localStorage.getItem("user")!).uid;
      place.userId = this.userId;
      this.requestService.addToFavorite(place);
      setTimeout(() => {
        this.infoWindow.close();
      }, 300);
    }
  }
}
