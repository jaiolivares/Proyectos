export interface StandardResponse<T> {
  EjecucionCorrecta: boolean;
  Mensaje: string;
  Dato: T | null;
}

export const respuestaOk = <T>(dato: T | null = null, mensaje = ""): StandardResponse<T> => ({
  EjecucionCorrecta: true,
  Mensaje: mensaje,
  Dato: dato,
});

export const respuestaError = <T>(mensaje = "", dato: T | null = null): StandardResponse<T> => ({
  EjecucionCorrecta: false,
  Mensaje: mensaje,
  Dato: dato,
});

