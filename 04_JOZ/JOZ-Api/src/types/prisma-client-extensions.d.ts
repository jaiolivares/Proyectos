declare module '@prisma/client' {
  // Extiende PrismaClient para exponer propiedades en camelCase que mapean
  // a los nombres generados (todo en minúsculas). Usamos `any` para evitar
  // acoplamiento estricto con la API generada.
  interface PrismaClient {
    marcaVehiculo?: any;
    marcaModeloVehiculo?: any;
    modeloVehiculo?: any;
    // Permitir cualquier propiedad camelCase para evitar errores de compilación
    // al mapear nombres generados a camelCase vía proxy.
    [key: string]: any;
  }
}
