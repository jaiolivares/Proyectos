import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { BancosComponent } from "./pages/bancos/bancos.component";
import { LoginComponent } from "./pages/login/login.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "bancos", component: BancosComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];
