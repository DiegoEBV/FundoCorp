create database agroexpor;
use agroexpor;
CREATE TABLE controlador
(
  id_controlador INT     NOT NULL auto_increment,
  id_gateway     INT     NOT NULL,
  nombre         VARCHAR(255) NULL    ,
  modelo         VARCHAR(150) NULL    ,
  ubicacion      VARCHAR(255) NULL    ,
  PRIMARY KEY (id_controlador)
);

CREATE TABLE fundo
(
  id_fundo  INT     NOT NULL auto_increment,
  nombre    VARCHAR(255) NULL    ,
  ubicacion VARCHAR(255) NULL    ,
  hectareas DECIMAL NULL    ,
  PRIMARY KEY (id_fundo)
);

CREATE TABLE gateway
(
  id_fundo   INT     NOT NULL,
  id_gateway INT     NOT NULL auto_increment,
  modelo     VARCHAR(100) NULL    ,
  ip_gateway VARCHAR(20) NULL    ,
  estado     VARCHAR(100) NULL    ,
  ubicacion  VARCHAR(255) NULL    ,
  PRIMARY KEY (id_gateway)
);

CREATE TABLE lectura_sensor
(
  id_lectura     bigint      NOT NULL auto_increment,
  id_controlador INT      NOT NULL,
  humedad        DECIMAL  NULL    ,
  radiacion      DECIMAL  NULL    ,
  valvula        BOOLEAN  NULL    ,
  fecha_hora     DATETIME NULL    ,
  PRIMARY KEY (id_lectura)
);

CREATE TABLE usuario
(
  id_usuario INT     NOT NULL auto_increment,
  nombres    VARCHAR(255) NULL    ,
  correo     VARCHAR(150) NULL unique,
  contraseña VARCHAR(255) NULL    ,
  rol        VARCHAR(10) NULL    ,
  PRIMARY KEY (id_usuario)
);

CREATE TABLE usuario_fundo
(
  id_fundo         INT  NOT NULL,
  id_usuario       INT  NOT NULL,
  fecha_asignacion DATE NULL    ,
  PRIMARY KEY (id_fundo, id_usuario)
);

ALTER TABLE usuario_fundo
  ADD CONSTRAINT FK_fundo_TO_usuario_fundo
    FOREIGN KEY (id_fundo)
    REFERENCES fundo (id_fundo);

ALTER TABLE usuario_fundo
  ADD CONSTRAINT FK_usuario_TO_usuario_fundo
    FOREIGN KEY (id_usuario)
    REFERENCES usuario (id_usuario);

ALTER TABLE gateway
  ADD CONSTRAINT FK_fundo_TO_gateway
    FOREIGN KEY (id_fundo)
    REFERENCES fundo (id_fundo);

ALTER TABLE controlador
  ADD CONSTRAINT FK_gateway_TO_controlador
    FOREIGN KEY (id_gateway)
    REFERENCES gateway (id_gateway);

ALTER TABLE lectura_sensor
  ADD CONSTRAINT FK_controlador_TO_lectura_sensor
    FOREIGN KEY (id_controlador)
    REFERENCES controlador (id_controlador);
