import { HttpClient, HttpClientJsonpModule } from "@angular/common/http";
import { Component, NgZone, OnInit } from "@angular/core";
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  isVisible: boolean = false;
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

  constructor(public httpClient: HttpClient) {}


  ngOnInit() {
    this.map = new google.maps.Map(
      document.getElementById("map")!,
      this.options
    );
    this.service = new google.maps.places.PlacesService(this.map);
    this.infoWindow = new google.maps.InfoWindow();
  }

  reset(){
    this.map = new google.maps.Map(
      document.getElementById("map")!,
      this.options
    );
  }

  showPlaces(type: string) {
    this.reset()
    const searchRequest: google.maps.places.PlaceSearchRequest = {
      type: type,
      radius: 1500,
      location: this.options.center!,
    };
    this.service.nearbySearch(searchRequest, (results, status) => {
      if (
        status !== google.maps.places.PlacesServiceStatus.OK ||
        results === null
      ) {
        return;
      }

      console.log(results);
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
      fields: ["name", "formatted_address"],
    };
    this.service.getDetails(detailsRequest, (place, status) => {
      if (
        status !== google.maps.places.PlacesServiceStatus.OK ||
        place === null
      ) {
        return;
      }

      console.log(place);
      const content = document.createElement("div");

      const nameElement = document.createElement("h4");
      nameElement.textContent = place.name!;
      content.appendChild(nameElement);

      const placeAddressElement = document.createElement("p");
      placeAddressElement.textContent = place.formatted_address!;
      content.appendChild(placeAddressElement);

      this.infoWindow.setContent(content);
      this.infoWindow.open(this.map, marker);
    });
  }
}
