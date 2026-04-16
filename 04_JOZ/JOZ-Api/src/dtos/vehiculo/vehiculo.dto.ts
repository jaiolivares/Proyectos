export class VehiculoDto {
  Id: number;
  IdMarcaModeloVehiculo: number;
  Ano: number;
  NumeroMotor: string;
  NumeroChasis: string;
  Color: string;
  FechaCompra: Date;
  MontoCompra: number;
  Vendido: boolean;
  FechaVenta?: Date | null;
  MontoVenta?: number | null;

  constructor(
    Id: number,
    IdMarcaModeloVehiculo: number,
    Ano: number,
    NumeroMotor: string,
    NumeroChasis: string,
    Color: string,
    FechaCompra: Date,
    MontoCompra: number,
    Vendido: boolean,
    FechaVenta: Date | null,
    MontoVenta: number | null
  ) {
    this.Id = Id;
    this.IdMarcaModeloVehiculo = IdMarcaModeloVehiculo;
    this.Ano = Ano;
    this.NumeroMotor = NumeroMotor;
    this.NumeroChasis = NumeroChasis;
    this.Color = Color;
    this.FechaCompra = FechaCompra;
    this.MontoCompra = MontoCompra;
    this.Vendido = Vendido;
    this.FechaVenta = FechaVenta;
    this.MontoVenta = MontoVenta;
  }
}
