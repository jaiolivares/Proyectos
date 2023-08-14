USE AppGastosJo
GO
CREATE TABLE TiposDeTransaccion
(
	idTipoDeTransaccion	INT		PRIMARY KEY IDENTITY(1,1),
	codigo				VARCHAR(20) NOT NULL DEFAULT '',
	nombre				VARCHAR(60) NOT NULL DEFAULT '',
	activo				BIT			NOT NULL DEFAULT 1
)