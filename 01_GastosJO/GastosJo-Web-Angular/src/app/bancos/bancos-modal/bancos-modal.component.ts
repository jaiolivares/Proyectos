import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { MaterialModule } from "../../material.module";

@Component({
  selector: "app-bancos-modal",
  standalone: true,
  imports: [FormsModule, MaterialModule],
  templateUrl: "./bancos-modal.component.html",
  styleUrl: "./bancos-modal.component.css",
})
export class BancosModalComponent {
  @Input() agregarModificarBanco: string = "";

  codigo: string = "";
  nombre: string = "";
  isChecked: boolean = true;
}
