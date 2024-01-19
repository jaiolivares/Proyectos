USE AppGastosJo
GO
DELETE CuentasBancaria
DELETE Bancos
DELETE TiposDeCuenta
GO

INSERT INTO Bancos VALUES ('00100','inactivo',0)
INSERT INTO Bancos VALUES ('Scotiabank','Banco Scotiabank',1)
INSERT INTO Bancos VALUES ('Chile','Banco Chile',1)
INSERT INTO Bancos VALUES ('Estado','Banco Estado',1)
GO
INSERT INTO TiposDeCuenta Values ('00100','inactivo',0)
INSERT INTO TiposDeCuenta Values ('Corriente','Cuenta Corriente',1)
INSERT INTO TiposDeCuenta Values ('Ahorro','Cuenta de Ahorro',1)
INSERT INTO TiposDeCuenta Values ('Rut','Cuenta Rut',1)
INSERT INTO TiposDeCuenta Values ('Vista','Cuenta Vista',1)
GO
INSERT INTO CuentasBancaria VALUES (1048,40,'CuentaRut','Cuenta Rut del Banco Estado', 1, 0)

SELECT * FROM Bancos
SELECT * FROM TiposDeCuenta
SELECT * FROM CuentasBancaria
SELECT * FROM TiposDeTransaccion