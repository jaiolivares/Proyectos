export interface Respuesta<T> {
  EjecucionCorrecta: boolean;
  Mensaje: string;
  Dato: T | null;
}

export const respuestaOk = <T>(dato: T | null = null, mensaje = ""): Respuesta<T> => ({
  EjecucionCorrecta: true,
  Mensaje: mensaje,
  Dato: dato,
});

export const respuestaError = <T>(mensaje = "", dato: T | null = null): Respuesta<T> => ({
  EjecucionCorrecta: false,
  Mensaje: mensaje,
  Dato: dato,
});

