
CREATE DATABASE jwt
GO

USE jwt
GO

CREATE TABLE usuarios (
    id_usr int NOT NULL IDENTITY (1,1),
    nombres char (100) NOT NULL,
    apellidos char (100) NOT NULL,
    email char (50) NOT NULL,
    usuario char (50) NOT NULL,
    contrasena char (100) NOT NULL,
    PRIMARY KEY (id_usr)
)
