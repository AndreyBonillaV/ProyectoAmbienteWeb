CREATE SCHEMA bd_ambiente;
USE bd_ambiente;

CREATE TABLE tbRol(
	IdRol INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	NombreRol  VARCHAR(60) NOT NULL
);

CREATE TABLE tbUsuario(
	IdUsuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	Cedula INT NOT NULL,
	Nombre VARCHAR(60) NOT NULL,
	Apellidos VARCHAR(60) NOT NULL,
	FechaNacimiento DATE NOT NULL,
	Telefono INT NOT NULL,
	Correo VARCHAR(60) NOT NULL,
	Contrasena VARCHAR(50) NOT NULL,
	IdRol INT NOT NULL,
    
    FOREIGN KEY (IdRol) REFERENCES tbRol (IdRol)
);

CREATE TABLE tbProveedor(
	idProvedor INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
	NombreEmpresa VARCHAR(60) NOT NULL,
    TelefonoEmpresa INT NOT NULL,
	IdUsuario INT NOT NULL,
    
	FOREIGN KEY (IdUsuario) REFERENCES tbusuario (IdUsuario)
);

CREATE TABLE tbTipoProducto(
	IdTipoProducto INT  PRIMARY key NOT NULL AUTO_INCREMENT,
	NombreTipoProducto VARCHAR(60) NOT NULL
);

CREATE TABLE tbProducto(
	idProducto INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	NombreProducto VARCHAR(100),
	DescripProducto VARCHAR(6000),
	RutaImagenProducto VARCHAR(2000),
	PrecioProducto INT NOT NULL,
	CantidadTotal INT NOT NULL,
	IdTipoProducto INT NOT NULL,
	idProvedor INT NOT NULL,

	FOREIGN KEY (idProvedor) REFERENCES tbProveedor (idProvedor),
	FOREIGN KEY (IdTipoProducto) REFERENCES tbTipoProducto (IdTipoProducto)
);

CREATE TABLE tbVentas(
	idVenta INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    Total INT NOT NULL,

	FOREIGN KEY (idUsuario) REFERENCES tbUsuario (idUsuario)
);

CREATE TABLE tbProductoVenta(
	idProductoVenta INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idVenta INT NOT NULL,
    idProducto INT NOT NULL,
    Cantidad INT NOT NULL,

	FOREIGN KEY (idVenta) REFERENCES tbVentas (idVenta),
	FOREIGN KEY (idProducto) REFERENCES tbProducto (idProducto)
);

-- El carrito se puede crear con LocalStorage o SessionStorage

-- INSERT ROLES
INSERT INTO tbRol (NombreRol) VALUES ('Administrador'), ('Cliente'), ('Proveedor');

-- INSERT USUARIOS
INSERT INTO tbUsuario (Cedula, Nombre, Apellidos, FechaNacimiento, Telefono, Correo, Contrasena, IdRol)

-- ADMINISTRADORES
VALUES (101110111, 'Andrey', 'Bonilla Valerín', '19980523', '89402152', 'andreybonilla23@gmail.com', '1234', '1'),
	   (202220222, 'Blondy', 'Soto', '19980523', '22222222', 'blondy@gmail.com', '1234', '1'),
	   (303330333, 'Carlos', 'Morales', '19980523', '33333333', 'carlos@gmail.com', '1234', '1'),
       
-- CLIENTES
	   (404440444, 'Walter', 'Martinez', '19901016', '44444444', 'walter@gmail.com', '1234', '2'),
	   (505550555, 'Andrés', 'Ramirez', '19901112', '55555555', 'andres@gmail.com', '1234', '2'),
	   (606660666, 'Bryan', 'Hernandez', '19910906', '66666666', 'bryan@gmail.com', '1234', '2'),
       
-- PROVEEDORES
	   (707770777, 'Alfredo', 'Castro Rojas', '19871005', '77777777', 'alfredo@gmail.com', '1234', '3'),
	   (808880888, 'Rosaura', 'Alvarez Martinez', '19860804', '88888888', 'rosaura@gmail.com', '1234', '3'),
	   (90999099, 'Alejandra', 'Duran Rodriguez', '19800514', '99999999', 'alejandra@gmail.com', '1234', '3');

-- INSERT PROVEEDORES
INSERT INTO tbProveedor (NombreEmpresa, TelefonoEmpresa, IdUsuario) 
VALUES ('CORSAIR', 257411111, '7'), ('MSI', 25742222, '8'), ('INTEL', 25743333, '9');

-- INSERT TIPOS DE PRODUCTOS
INSERT INTO tbTipoProducto (NombreTipoProducto) VALUES ('Procesador'), ('Tarjeta Gráfica'), ('Mermoria RAM');

-- INSERT PRODUCTOS
INSERT INTO tbProducto (NombreProducto, DescripProducto, RutaImagenProducto, PrecioProducto, Cantidadtotal, IdTipoProducto, idProvedor)

-- INSERT PROCESADORES
VALUES ('INTEL CORE I9 9900K', 'Socket: LGA 1151 Familia: Coffee-Lake Cores: 8 Threads: 16 Frecuencia: 3.6 Ghz / 5.0 Ghz Turbo', 'https://i.ibb.co/QYw6Ghm/25.jpg', 359000, 100, 1, 3),
	   ('INTEL CORE I7 9700F', 'Socket: LGA 1151 Familia: Coffee-Lake Cores: 8 Threads: 8 Frecuencia: 3.0 Ghz / 4.7 Ghz Turbo', 'https://i.ibb.co/bbRyCvd/24.jpg', 235000, 150, 1, 3),
       ('INTEL CORE I5 9600KF', 'Socket: LGA 1151 Familia: Coffee-Lake Cores: 6 Threads: 6 Frecuencia: 3.7 Ghz / 4.6 Ghz Turbo', 'https://i.ibb.co/5YcXGq3/23.jpg', 149000, 300, 1, 3),

-- INSERT TARJETAS GRÁFICAS
       ('MSI GEFORCE RTX 2080TI GAMING X TRIO 11 GB', 'Fabricante: MSI GPU: NVIDIA GeForce RTX 2080Ti Memoria: 11 GB GDDR6 Boost Clock: 1755 MHz', 'https://i.ibb.co/VJ61Ksz/6.jpg', 875000, 100, 2, 2),
       ('MSI RADEON RX 5700 XT GAMING X 8 GB', 'Fabricante: MSI GPU: AMD Radeon RX 5700 XT Memoria: 8 GB GDDR6 Core Clock: 1980 MHz', 'https://i.ibb.co/Q9R74GP/7.jpg', 295000, 100, 2, 2),

-- INSERT MEMORIAS RAM
       ('CORSAIR VENGEANCE LPX 8 GB DDR4 2666 - NEGRO', 'Marca: Corsair Tamano: 120mm LED: RGB', 'https://i.ibb.co/S0RJPpY/42.jpg', 26000, 200, 3, 1);