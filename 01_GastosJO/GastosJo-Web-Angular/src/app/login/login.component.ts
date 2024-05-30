import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  esDesarrollo: boolean = true;

  usuarioInicial: any = { codigoUsuario: "jolivares", activo: true };

  constructor(private form: FormBuilder) {
    this.myForm = this.form.group({
      usuario: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    // this.myForm.get("usuario")?.setValue(this.usuarioInicial);
    if (this.esDesarrollo) {
      this.myForm.patchValue({ usuario: this.usuarioInicial.codigoUsuario });
    }
  }
  
  login2(e: Event) {
    //e.preventDefault();
    console.log(this.myForm);
  }

  hasErrorFunct(controlName: string, errorType: string) {
    return this.myForm.get(controlName)?.hasError(errorType) && this.myForm.get(controlName)?.touched;
  }
}
