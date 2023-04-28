import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { map, Observable } from "rxjs";
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

/*   addToFavorite(place: Favorite) {
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
  } */

  addToFavorite(place: Favorite) {
    const placesCollection = this.firestore.collection("favorite");
    const docRef = placesCollection.doc(place.place_id);

    docRef.set({
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
  getAllPlaces(): Observable<Favorite[]> {
    return this.firestore.collection("favorite").get().pipe(
      map((querySnapshot) => {
        const places: any[] = [];
        querySnapshot.forEach((doc) => {
          places.push(doc.data());
        });
        return places;
      })
    );
  }

  deletePlace(id: string){
    this.firestore.collection('favorite')
    .doc(id).delete().then(() => {
      console.log("Place deleted from database");
    })
    .catch(err => {
      console.log('Oops..',err)
    })
  } 
}
