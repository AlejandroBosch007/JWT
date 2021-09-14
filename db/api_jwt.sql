CREATE DATABASE jwt
GO

USE jwt
GO

CREATE TABLE users (
    id_usr int NOT NULL IDENTITY (1,1),
    [name] char (100) NOT NULL,
    lastname char (100) NOT NULL,
    email char (50) NOT NULL,
    [user] char (50) NOT NULL,
    [password] char (100) NOT NULL,
    PRIMARY KEY (id_usr)
)