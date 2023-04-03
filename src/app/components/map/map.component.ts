import { Component } from "@angular/core";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent {
  isVisible: boolean = false;
  apiKye: string = "AIzaSyAp2aFUhqhey1y77f7FBb-7L6KraRxdC1M";

  /* Map */

  /*   map = new google.maps.Map((),{
    center: { lat: 60.18608603539844, lng: 24.943128762153208 },
    zoom: 8,
  }); */
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 60.18608603539844,
    lng: 24.943128762153208,
  };
  zoom = 13;
}
