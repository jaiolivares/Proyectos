CREATE DATABASE `JOZ` 

CREATE TABLE `Usuarios` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `NombreUsuario` varchar(100) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `SegundoNombre` varchar(50) DEFAULT NULL,
  `ApellidoPaterno` varchar(50) DEFAULT NULL,
  `ApellidoMaterno` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `FechaCreacion` datetime DEFAULT NULL,
  `FechaUltimoLogin` datetime DEFAULT NULL,
  `EstaBloqueado` tinyint DEFAULT NULL,
  `EstaActivo` tinyint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `NombreUsuario_UNIQUE` (`NombreUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

INSERT INTO `JOZ`.`Usuarios` (`NombreUsuario`, `Nombre`, `ApellidoPaterno`, `Email`) VALUES ('jai', 'javier', 'olivare', 'javi@aa.aa');
