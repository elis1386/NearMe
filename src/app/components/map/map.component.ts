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
  mapLoaded!: boolean;
  map!: google.maps.Map;
  geocoder = new google.maps.Geocoder();

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

  constructor(private ngZone: NgZone, httpClient: HttpClient) {}

  ngOnInit() {
    // initialize the map
    this.map = new google.maps.Map(document.getElementById("#map")!, {...this.options});
  }
}
