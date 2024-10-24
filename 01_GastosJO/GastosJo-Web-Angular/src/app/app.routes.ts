import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { BancosComponent } from "./pages/bancos/bancos.component";
import { LoginComponent } from "./pages/login/login.component";
import { Bancos2Component } from "./pages/bancos2/bancos2.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "bancos", component: BancosComponent },
  { path: "bancos2", component: Bancos2Component },
  { path: "**", redirectTo: "", pathMatch: "full" },
];
