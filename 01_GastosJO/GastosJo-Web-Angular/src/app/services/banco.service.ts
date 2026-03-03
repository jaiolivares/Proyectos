import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, of } from "rxjs";

import { Config } from "../environments/enviroment";
import { IBanco } from "../models/banco";
import { Settings } from "../environments/enviroment";
import { arrayBancos } from "../../assets/jsonData/bancos";
import { Estados } from "../models/shared/estado";

const service: string = "Banco";

@Injectable({
  providedIn: "root",
})
export class BancoService {
  private _http = inject(HttpClient);
  private apiGastosJo: string = Settings.apiGastosJo.url;
  private registrosPorPaginaDefault: number = Config.registrosPorPagina;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  listar(paginaActual: number, registrosPorPagina: number = this.registrosPorPaginaDefault, estados: number = Estados.Todos): Observable<IBanco[]> {
    if (Config.esDesarrollo) {

      registrosPorPagina = 3;

      let numeroDesde = (paginaActual - 1) * registrosPorPagina;
      let registrosFiltrados = arrayBancos.splice(numeroDesde, registrosPorPagina);

      return of(registrosFiltrados);
    } else {
      return this._http.get<IBanco[]>(`${this.apiGastosJo}/${service}/Listar?PaginaActual=${paginaActual}&RegistrosPorPagina=${registrosPorPagina}&estados=${estados}`);
    }
  }
}
