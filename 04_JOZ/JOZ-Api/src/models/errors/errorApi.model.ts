export interface ErrorApi {
  Id: number;
  IdUsuario?: number | null;
  NombreError: string;
  Mensaje: string;
  StackTrace?: string | null;
  TokenAcceso?: string | null;
  MetodoHttp: string;
  Endpoint: string;
  RequestBody?: string | null;
  QueryParams?: string | null;
  RouteParams?: string | null;
  StatusCode: number;
  FechaCreacion: Date;
}

export interface ErrorApiCreate {
  IdUsuario?: number | null;
  NombreError: string;
  Mensaje: string;
  StackTrace?: string | null;
  TokenAcceso?: string | null;
  MetodoHttp: string;
  Endpoint: string;
  RequestBody?: string | null;
  QueryParams?: string | null;
  RouteParams?: string | null;
  StatusCode?: number;
}