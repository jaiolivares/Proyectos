import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { Settings } from "../environments/enviroment";
import { Config } from "../environments/enviroment";
import { Observable } from "rxjs";
import { IBanco } from "../models/banco";

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
    return this._http.get<IBanco[]>(`${this.apiGastosJo}/${service}/Listar?PaginaActual=${paginaActual}&RegistrosPorPagina=${registrosPorPagina}&estados=${estados}`);
  }
}
