import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Favorite } from "src/app/models/favorite";
import firebase from "firebase/compat/app";
import { collection, collectionData } from "@angular/fire/firestore";
import { Firestore } from "@firebase/firestore";

@Injectable({
  providedIn: "root",
})
export class RequestsService {
  favorite: Favorite[] = [];
  placesCollection: AngularFirestoreCollection<Favorite> | undefined;
  places!: Observable<Favorite[]>;
  place!: Observable<Favorite>;

  constructor(private firestore: AngularFirestore) {}

  addToFavorite(place: Favorite) {
    const placesCollection = this.firestore.collection("favorite");
    placesCollection
      .add({
        id: place.place_id,
        name: place.name,
        vicinity: place.vicinity,
        photo: place.photos![0].getUrl(),
        rating: place.rating,
        userId: place.userId,
      })
      .then(() => console.log("Data added to Firestore successfully"))
      .catch((error) =>
        console.error("Error adding data to Firestore: ", error)
      );
  }

  getAllPlaces() {
    this.firestore
      .collection("favorite")
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });
  }
}
