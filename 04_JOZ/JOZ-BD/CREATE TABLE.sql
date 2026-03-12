/*CREATE DATABASE `JOZ`;*/ 

CREATE TABLE `Usuarios` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `NombreUsuario` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `SegundoNombre` varchar(50) NULL,
  `ApellidoPaterno` varchar(50) NOT NULL,
  `ApellidoMaterno` varchar(50) NULL,
  `Email` varchar(100) NOT NULL,
  `FechaCreacion` datetime NOT NULL,
  `FechaUltimoLogin` datetime NULL,
  `EstaBloqueado` tinyint NOT NULL,
  `EstaActivo` tinyint NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `NombreUsuario_UNIQUE` (`NombreUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `JOZ`.`Usuarios` (`NombreUsuario`, `Password`, `Nombre`, `ApellidoPaterno`, `Email`, `FechaCreacion`, `EstaBloqueado`, `EstaActivo`) 
VALUES ('jai', 'xxx', 'javier', 'olivares', 'javi@aa.aa', date.now(), 0, 1);


/*DROP TABLE Usuarios*/