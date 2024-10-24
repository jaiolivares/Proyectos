import { Component, inject, OnInit } from "@angular/core";

import { MaterialModule } from "../../shared/material.module";
import { BancosModalComponent } from "./bancos-modal/bancos-modal.component";
import { BancoService } from "../../services/banco.service";
import { IBanco } from "../../models/banco";
import { FormsModule } from "@angular/forms";
import { Config } from "../../environments/enviroment";

@Component({
  selector: "app-bancos",
  standalone: true,
  imports: [MaterialModule, BancosModalComponent, FormsModule],
  templateUrl: "./bancos.component.html",
  styleUrl: "./bancos.component.css",
})
export class BancosComponent implements OnInit {
  private _bancoService = inject(BancoService);

  agregarModificarBanco: string = "";
  nombreBanco: string = "";

  loading: boolean = true;
  bancoLista: IBanco[] = [];
  busquedaText: string = "";

  get bancoListaFiltrado() {
    return this.bancoLista.filter((item) => Object.values(item).some((val) => String(val).toLocaleLowerCase().includes(this.busquedaText.toLocaleLowerCase())));
  }

  ngOnInit(): void {
    this.cargarListaBancos();
  }

  setAgregarModificar(agregaModifica: string) {
    this.agregarModificarBanco = agregaModifica;
  }

  cargarListaBancos() {
    this._bancoService.listar(1, Config.registrosPorPagina).subscribe((data: IBanco[]) => {
      this.bancoLista = data;
      this.loading = false
    });
  }
}
