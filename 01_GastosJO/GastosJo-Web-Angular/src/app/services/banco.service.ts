import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, of } from "rxjs";

import { Config } from "../environments/enviroment";
import { IBanco } from "../models/banco";
import { Settings } from "../environments/enviroment";
import { arrayBancos } from "../../assets/jsonData/bancos";

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

  listar(paginaActual: number, registrosPorPagina: number = this.registrosPorPaginaDefault, estados: number = 2): Observable<IBanco[]> {
    if (Config.esDesarrollo) {
      return of(arrayBancos);
    } else {
      return this._http.get<IBanco[]>(`${this.apiGastosJo}/${service}/Listar?PaginaActual=${paginaActual}&RegistrosPorPagina=${registrosPorPagina}&estados=${estados}`);
    }
  }
}
