import { HttpClient } from "@angular/common/http";
import { Component, NgZone, OnInit, ViewEncapsulation } from "@angular/core";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { mapKey } from "src/keys";
import {} from "@angular/google-maps";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  isVisible: boolean = false;
  PLACES_API_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500ey=
    ${mapKey.MAP_API_KEY}`;
  showMapPill!: boolean;
  mapLoaded!: boolean;
  map!: google.maps.Map;

  center: google.maps.LatLngLiteral = {
    lat: 60.18608603539844,
    lng: 24.943128762153208,
  };
  zoom!: 10;
  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
  };



  constructor(private ngZone: NgZone) {}

  ngOnInit() {
      // initialize the map 
      this.map = new google.maps.Map(document.getElementById("#map")!, {
        ...this.options,
      });
  }
}