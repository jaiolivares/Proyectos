CREATE TABLE `Usuario` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `NombreUsuario` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `SegundoNombre` varchar(50) NULL,
  `ApellidoPaterno` varchar(50) NOT NULL,
  `ApellidoMaterno` varchar(50) NULL,
  `Email` varchar(100) NOT NULL,
  `FechaCreacion` datetime NOT NULL,
  `FechaModificacion` datetime NULL,
  `FechaUltimoLogin` datetime NULL,
  `EstaBloqueado` tinyint NOT NULL,
  `EstaActivo` tinyint NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `NombreUsuario_UNIQUE` (`NombreUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*DROP TABLE Usuario*/