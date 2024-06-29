import { Component } from "@angular/core";

import { MaterialModule } from "../../shared/material.module";
import { BancosModalComponent } from "./bancos-modal/bancos-modal.component";

@Component({
  selector: "app-bancos",
  standalone: true,
  imports: [MaterialModule, BancosModalComponent],
  templateUrl: "./bancos.component.html",
  styleUrl: "./bancos.component.css",
})
export class BancosComponent {
  agregarModificarBanco: string = "";
  nombreBanco: string = "";

  setAgregarModificar(agregaModifica: string) {
    this.agregarModificarBanco = agregaModifica;
  }
}
