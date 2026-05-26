export interface ApiResponse<T> {
  EjecucionCorrecta: boolean;
  Mensaje: string;
  Dato: T | null;
}
