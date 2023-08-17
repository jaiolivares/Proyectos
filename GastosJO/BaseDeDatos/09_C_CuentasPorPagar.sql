USE AppGastosJo
GO
CREATE TABLE CuentasPorPagar
(
	idCuentaPorPagar		INT			PRIMARY KEY IDENTITY(1,1),
	idCuentaFija			INT			NOT NULL DEFAULT 0,
	promedioUltimoAno		INT			NOT NULL DEFAULT 0,
	montoDelPago			INT			NOT NULL DEFAULT 0,
	estadoDelPago			INT			NOT NULL DEFAULT 0, -->|1:PendientePorPagar|2:Pagado|3:Omitido|<
)
GO
ALTER TABLE CuentasPorPagar
ADD FOREIGN KEY (idCuentaFija) REFERENCES CuentasFijas (idCuentaFija)    