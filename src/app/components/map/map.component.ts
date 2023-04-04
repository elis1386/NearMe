import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { mapKey } from "src/keys";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent {
  isVisible: boolean = false;

  /* Map */

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 60.18608603539844,
    lng: 24.943128762153208,
  };
  zoom = 13;
}

//API_KEY for all requests 
/* https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=restaurant&name=harbour&key=
${mapKey.MAP_API_KEY}
 */