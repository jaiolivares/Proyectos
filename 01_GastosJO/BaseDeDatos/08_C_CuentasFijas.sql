USE AppGastosJo
GO
CREATE TABLE CuentasFijas
(
	idCuentaFija			INT			PRIMARY KEY IDENTITY(1,1),
	idOrigenDeGasto			INT			NOT NULL DEFAULT 0,
	idEmpresaDeGasto		INT			NOT NULL DEFAULT 0,
	diaVencimientoAprox		INT			NOT NULL DEFAULT 0,
	esPagoMensual			BIT			NOT NULL DEFAULT 1,
	mesesDePago				VARCHAR(60)	NOT NULL DEFAULT '',
	activo					BIT			NOT NULL DEFAULT 1
)
GO
ALTER TABLE CuentasFijas
ADD FOREIGN KEY (idOrigenDeGasto) REFERENCES OrigenesDeGastos (idOrigenDeGasto)
GO
ALTER TABLE CuentasFijas
ADD FOREIGN KEY (idEmpresaDeGasto) REFERENCES EmpresasDeGastos (idEmpresaDeGasto)