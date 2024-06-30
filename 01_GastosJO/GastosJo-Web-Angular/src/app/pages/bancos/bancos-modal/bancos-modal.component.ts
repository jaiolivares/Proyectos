import { Component, Input, signal } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../../../shared/material.module";
import { FuncHasError } from "../../../shared/utils";

@Component({
  selector: "app-bancos-modal",
  standalone: true,
  imports: [FormsModule, MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./bancos-modal.component.html",
  styleUrl: "./bancos-modal.component.css",
})
export class BancosModalComponent {
  funAceptarEliminar() {
    throw new Error("Method not implemented.");
  }
  funCancelarEliminar() {
    throw new Error("Method not implemented.");
  }

  @Input() agregarModificarBanco: string = "";
  @Input() nombreBanco: string = "";

  codigo: string = "";
  nombre: string = "";
  isChecked: boolean = true;

  formBanco: FormGroup;

  constructor(private form: FormBuilder) {
    this.formBanco = this.form.group({
      codigo: ["", [Validators.required, Validators.minLength(3)]],
      nombre: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  hasError(controlName: string, errorType: string) {
    return FuncHasError(this.formBanco, controlName, errorType);
  }

  aceptar(e: Event): void {
    e.preventDefault();
    console.log("xxx");
    console.log(this.formBanco);

    const modal = document.getElementById("modalBancos");
  }
}
