CREATE TABLE `TipoVehiculo` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Tipo` varchar(20) NOT NULL,
  `Descripcion` varchar(60) NOT null,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `JOZ`.`TipoVehiculo` (`Tipo`, `Descripcion`) 
values
('Auto', 'Automóvil'),
('Moto', 'Motocicleta');

/*----------------------------------------------------------------------*/

CREATE TABLE `MarcaVehiculo` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Marca` varchar(20) NOT NULL,
  `Descripcion` varchar(60) NOT null,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `JOZ`.`MarcaVehiculo` (`Marca`, `Descripcion`) 
values
('Chevrolet', 'Chevrolet'),
('Suzuki', 'Suzuki'),
('Honda', 'Honda');

/*----------------------------------------------------------------------*/

CREATE TABLE `ModeloVehiculo` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdTipoVehiculo` int not null,
  `Modelo` varchar(20) NOT NULL,
  `Descripcion` varchar(60) NOT null,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`IdTipoVehiculo`) REFERENCES `TipoVehiculo`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `JOZ`.`ModeloVehiculo` (`IdTipoVehiculo`, `Modelo`, `Descripcion`) 
values
(1, 'Tracker', 'Tracker'),
(1, 'Maruti', 'Maruti'),
(2, 'CB300R', 'CB300R');

/*----------------------------------------------------------------------*/

CREATE TABLE `MarcaModeloVehiculo` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdMarca` int NOT NULL,
  `IdModelo` int  NOT null,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`IdMarca`) REFERENCES `MarcaVehiculo`(`Id`),
  FOREIGN KEY (`IdModelo`) REFERENCES `ModeloVehiculo`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
INSERT INTO `JOZ`.`MarcaModeloVehiculo` (`IdMarca`, `IdModelo`) 
values
(1, 1),
(2, 2),
(3, 3);

/*----------------------------------------------------------------------*/

CREATE TABLE `Vehiculo` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdMarcaModeloVehiculo` int NOT NULL,
  `Ano` int NOT null,
  `NumeroMotor` varchar(20) not null,
  `NumeroChasis` varchar(30) not null,
  `Color` varchar(20) not null,
  `FechaCompra` datetime not null,
  `MontoCompra` int not null,
  `Vendido` tinyint not null,
  `FechaVenta` datetime,
  `MontoVenta` int,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`IdMarcaModeloVehiculo`) REFERENCES `MarcaModeloVehiculo`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
/*----------------------------------------------------------------------*/

CREATE TABLE `Taller` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `IdComuna` int NOT NULL,
  `Direccion` varchar(100) NOT null,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`IdComuna`) REFERENCES `Comuna`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
/*----------------------------------------------------------------------*/

CREATE TABLE `Mantencion` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdVehiculo` int NOT NULL,
  `Fecha` datetime not null,
  `IdTaller` int not null,
  `Servicio` varchar(150) not null,
  `MontoTotal` int not null,
  `Boleta` text,
  `IdUsuario` int not null,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`IdVehiculo`) REFERENCES `Vehiculo`(`Id`),
  FOREIGN KEY (`IdTaller`) REFERENCES `Taller`(`Id`),
  FOREIGN KEY (`IdUsuario`) REFERENCES `Usuario`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
/*----------------------------------------------------------------------*/

CREATE TABLE `MantencionDetalle` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdMantencion` int NOT NULL,
  `Producto` varchar(60) not null,
  `DetalleProducto` varchar(250) not null,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`IdMantencion`) REFERENCES `Mantencion`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
/*----------------------------------------------------------------------*/

/*
DROP TABLE MantencionDetalle, Mantencion, Taller, Vehiculo, MarcaModeloVehiculo, MarcaVehiculo, TipoVehiculo, ModeloVehiculo; 
*/