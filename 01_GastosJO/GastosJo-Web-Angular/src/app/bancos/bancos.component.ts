import { Component } from "@angular/core";
import { BancosModalComponent } from "./bancos-modal/bancos-modal.component";

@Component({
  selector: "app-bancos",
  standalone: true,
  imports: [BancosModalComponent],
  templateUrl: "./bancos.component.html",
  styleUrl: "./bancos.component.css",
})
export class BancosComponent {
  agregarModificar: string = "";

  setAgregarModificar(agregaModifica: string) {
    this.agregarModificar = agregaModifica;
  }
}
