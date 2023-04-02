import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  collectionData,
  addDoc,
  Firestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  imgUrl = 'assets/logoNM2.png';
  randomPhoto = 'https://source.unsplash.com/random/?restaurant/300x100';
  isLogged: boolean = false;
  user: any;
  currentUser: any;
  constructor(
    public authService: AuthService,
    public auth: AngularFireAuth,
    public database: AngularFirestore,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      let loggedUser = JSON.parse(localStorage.getItem('user')!);
      this.currentUser = loggedUser;
    },1000);

  }
}
