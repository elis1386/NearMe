import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainComponent } from "./components/main/main.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MapComponent } from "./components/map/map.component";
import { ListComponent } from "./components/list/list.component";
import { SearchComponent } from "./components/search/search.component";
import { FavoriteComponent } from "./components/favorite/favorite.component";
import { GoogleMapsModule } from "@angular/google-maps";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import {
  AngularFireDatabase,
  AngularFireDatabaseModule,
} from "@angular/fire/compat/database";
import { environment } from "../environments/enviorment";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideDatabase, getDatabase } from "@angular/fire/database";
import {
  provideFirestore,
  getFirestore,
  Firestore,
} from "@angular/fire/firestore";
import { provideStorage, getStorage } from "@angular/fire/storage";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { AuthService } from "./services/auth.service";
import { CommonModule } from "@angular/common";
import { WeatherComponent } from "./components/weather/weather.component";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PlacePageComponent } from './components/place-page/place-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    ListComponent,
    SearchComponent,
    FavoriteComponent,
    SignUpComponent,
    SignInComponent,
    WeatherComponent,
    SidebarComponent,
    ForgotPasswordComponent,
    PlacePageComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,

    GooglePlaceModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
