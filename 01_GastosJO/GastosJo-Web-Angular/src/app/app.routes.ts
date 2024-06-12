import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { BancosComponent } from "./bancos/bancos.component";
import { LoginComponent } from "./login/login.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "bancos", component: BancosComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];
