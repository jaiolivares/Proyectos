USE AppGastosJo
GO
CREATE TABLE EmpresasDeGastos
(
	idEmpresaDeGasto	INT		PRIMARY KEY IDENTITY(1,1),
	codigo				VARCHAR(20) NOT NULL DEFAULT '',
	nombre				VARCHAR(60) NOT NULL DEFAULT '',
	activo				BIT			NOT NULL DEFAULT 1,
	idOrigenDeGasto		INT			NOT NULL DEFAULT 0
)
GO
ALTER TABLE EmpresasDeGastos
ADD FOREIGN KEY (idOrigenDeGasto) REFERENCES OrigenesDeGastos (idOrigenDeGasto)