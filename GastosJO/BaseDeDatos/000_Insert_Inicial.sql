USE AppGastosJo
GO
DELETE CuentasBancaria
DELETE Bancos
DELETE TiposDeCuenta
DELETE TiposDeTransaccion
GO

INSERT INTO Bancos VALUES ('00100','inactivo',0)
INSERT INTO Bancos VALUES ('Scotiabank','Banco Scotiabank',1)
INSERT INTO Bancos VALUES ('Chile','Banco Chile',1)
INSERT INTO Bancos VALUES ('Estado','Banco Estado',1)
GO
INSERT INTO TiposDeCuenta VALUES ('00100','inactivo',0)
INSERT INTO TiposDeCuenta VALUES ('Corriente','Cuenta Corriente',1)
INSERT INTO TiposDeCuenta VALUES ('Ahorro','Cuenta de Ahorro',1)
INSERT INTO TiposDeCuenta VALUES ('Rut','Cuenta Rut',1)
INSERT INTO TiposDeCuenta VALUES ('Vista','Cuenta Vista',1)
GO
INSERT INTO CuentasBancaria VALUES (1048,40,'CuentaRut','Cuenta Rut del Banco Estado', 1, 0)
GO
INSERT INTO TiposDeTransaccion VALUES ('00100','inactivo',0)
INSERT INTO TiposDeTransaccion VALUES ('RedCompra','Compra RedCompra', 1)
INSERT INTO TiposDeTransaccion VALUES ('PagoLinea','Pago en línea', 1)

SELECT * FROM Bancos
SELECT * FROM TiposDeCuenta
SELECT * FROM CuentasBancaria
SELECT * FROM TiposDeTransaccion