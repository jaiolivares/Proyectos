select * from TipoVehiculo
select * from MarcaVehiculo
select * from ModeloVehiculo
select * from MarcaModeloVehiculo
select * from Vehiculo
select * from Taller
select * from Mantencion
select * from MantencionDetalle


INSERT INTO `JOZ`.`TipoVehiculo` (`Tipo`, `Descripcion`) 
values
('Auto', 'Automóvil'),
('Moto', 'Motocicleta');


INSERT INTO `JOZ`.`MarcaVehiculo` (`Marca`, `Descripcion`) 
values
('Chevrolet', 'Chevrolet'),
('Suzuki', 'Suzuki'),
('Honda', 'Honda');

INSERT INTO `JOZ`.`ModeloVehiculo` (`IdTipoVehiculo`, `Modelo`, `Descripcion`) 
values
(1, 'Tracker', 'Tracker'),
(1, 'Maruti', 'Maruti'),
(2, 'CB300R', 'CB300R');

INSERT INTO `JOZ`.`MarcaModeloVehiculo` (`IdMarca`, `IdModelo`) 
values
(1, 1),
(2, 2),
(3, 3);