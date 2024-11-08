import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

import { FuncHasError } from "../../shared/utils";
import { Config } from "../../environments/enviroment";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  usuarioInicial: any = { codigoUsuario: "jolivares", password: "1234" };

  constructor(private form: FormBuilder) {
    this.myForm = this.form.group({
      usuario: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    if (Config.esDesarrollo) {
      this.myForm.patchValue({ usuario: this.usuarioInicial.codigoUsuario, password: this.usuarioInicial.password });
    }
  }

  login2(e: Event) {
    //e.preventDefault();
    console.log(this.myForm);
    console.log(this.myForm.get("usuario")?.value);
  }

  hasError(controlName: string, errorType: string) {
    return FuncHasError(this.myForm, controlName, errorType);
  }

  // validaIngreso() {
  //   if (this.myForm.value.usuario.trim() !== "" && this.myForm.value.password.trim() !== "") {
  //   }
  // }
}
