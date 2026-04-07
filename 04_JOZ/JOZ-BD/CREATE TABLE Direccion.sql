CREATE TABLE `Region` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Codigo` varchar(20) NOT NULL,
  `Descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*----------------------------------------------------------------------*/

CREATE TABLE `Ciudad` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdRegion` int NOT NULL,
  `Codigo` varchar(20) NOT NULL,
  `Descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`IdRegion`) REFERENCES `Region`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*----------------------------------------------------------------------*/

CREATE TABLE `Comuna` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdCiudad` int NOT NULL,
  `Codigo` varchar(20) NOT NULL,
  `Descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`IdCiudad`) REFERENCES `Ciudad`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



/*
DROP TABLE Comuna, Ciudad, Region;
*/