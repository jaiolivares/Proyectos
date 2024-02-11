USE AppGastosJo
GO
CREATE TABLE CuentasBancaria
(
	idCuentaBancaria	INT		PRIMARY KEY IDENTITY(1,1),
	idBanco				INT			NOT NULL DEFAULT 0,
	idTipoDeCuenta		INT			NOT NULL DEFAULT 0,
	codigo				VARCHAR(20) NOT NULL DEFAULT '',
	nombre				VARCHAR(60) NOT NULL DEFAULT '',
	activo				BIT			NOT NULL DEFAULT 1,
	verCuentasPorPagar	BIT			NOT NULL DEFAULT 0
)
GO
ALTER TABLE CuentasBancaria
ADD FOREIGN KEY (idBanco) REFERENCES Bancos (idBanco)
GO
ALTER TABLE CuentasBancaria
ADD FOREIGN KEY (idTipoDeCuenta) REFERENCES TiposDeCuenta (idTipoDeCuenta)