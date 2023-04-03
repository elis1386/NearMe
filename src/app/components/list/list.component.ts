import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs";
import { PlaceDataService } from "src/app/services/place-data.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  isVisible: boolean = false;
  myData: any;
  myData$: any;

  constructor(private PlaceDataService: PlaceDataService) {}

  ngOnInit(): void {
    this.myData$ = this.PlaceDataService.getData().pipe(
      tap((data) => this.myData)
    );
  }
}
