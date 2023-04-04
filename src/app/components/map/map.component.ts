import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent {
  isVisible: boolean = false;
  apiKye: string = "AIzaSyALxmPNw9nwGV23i6CAf_pcMdYG8-unr28";

  /* Map */

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 60.18608603539844,
    lng: 24.943128762153208,
  };
  zoom = 13;
}


/* API_KEY for all requests 
https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=restaurant&name=harbour&key= AIzaSyALxmPNw9nwGV23i6CAf_pcMdYG8-unr28*/