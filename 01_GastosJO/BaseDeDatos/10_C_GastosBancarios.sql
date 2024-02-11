USE AppGastosJo
GO
CREATE TABLE GastosBancarios
(
	idGastoBancario			INT				PRIMARY KEY IDENTITY(1,1),
	idCuentaBancaria		INT				NOT NULL DEFAULT 0,
	idTipoDeTransaccion		INT				NOT NULL DEFAULT 0,
	idOrigenDeGasto			INT				NOT NULL DEFAULT 0,
	descripcion				VARCHAR(100)	NOT NULL DEFAULT '', --//Descripción: EmpresaDegasto
	fecha					DATETIME		NOT NULL DEFAULT GETDATE(),
	monto					INT				NOT NULL DEFAULT 0,
	saldo					INT				NOT NULL DEFAULT 0,
	orden					INT				NOT NULL DEFAULT 0
)
GO
ALTER TABLE GastosBancarios
ADD FOREIGN KEY (idCuentaBancaria) REFERENCES CuentasBancaria (idCuentaBancaria)
GO
ALTER TABLE GastosBancarios
ADD FOREIGN KEY (idTipoDeTransaccion) REFERENCES TiposDeTransaccion (idTipoDeTransaccion)
GO
ALTER TABLE GastosBancarios
ADD FOREIGN KEY (idOrigenDeGasto) REFERENCES OrigenesDeGastos (idOrigenDeGasto)

--idCuentaBancaria			| idTipoDeTransaccion	| idOrigenDeGasto
--banco chile - cta corriente	| CompraRedCompra		| Casa
--banco chile - cta corriente	| transferencia			| Mary
--banco chile - cta corriente	| transferencia			| Gastos comunes Depto
--banco chile - cta corriente	| Pago de cuenta		| Gastos comunes Depto