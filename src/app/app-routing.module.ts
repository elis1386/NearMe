import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./components/main/main.component";
import { MapComponent } from "./components/map/map.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { AuthGuard } from "./services/auth.guard";
import { FavoriteComponent } from "./components/favorite/favorite.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { PlacePageComponent } from "./components/place-page/place-page.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "", redirectTo: "/sign-in", pathMatch: "full" },
  { path: "sign-in", component: SignInComponent },
  { path: "register-user", component: SignUpComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "map", component: MapComponent, canActivate: [AuthGuard] },
  { path: "favorite", component: FavoriteComponent },
  { path: "place/:id", component: PlacePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
