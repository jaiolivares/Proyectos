import { FormGroup } from "@angular/forms";

export function FuncHasError(myForm: FormGroup, controlName: string, errorType: string) {
  return myForm.get(controlName)?.hasError(errorType) && myForm.get(controlName)?.touched;
}

// export function eliminarEspaciosInput(inputText: string) {
//   switch (inputText) {
//     case "nombre":
//       this.nombre = this.nombre.trim();
//       break;
//     case "email":
//       this.email = this.email.trim();
//       break;
//   }
// }