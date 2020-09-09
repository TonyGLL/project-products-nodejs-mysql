CREATE DATABASE project_nodejs_mysql;

CREATE TABLE products(
    id              INT(255) AUTO_INCREMENT NOT NULL,
    unit_id         INT(255) NOT NULL ,
    name            VARCHAR(50) NOT NULL,
    price           FLOAT NOT NULL,
    stock           DOUBLE NOT NULL,

    CONSTRAINT pk_products PRIMARY KEY(id),
    CONSTRAINT fk_product_unit FOREIGN KEY(unit_id) REFERENCES units(id)
)ENGINE=INNODB;

INSERT INTO products VALUES(NULL, 1, "Cemento", 50.00, 100);



CREATE TABLE units(
    id              INT(255) AUTO_INCREMENT NOT NULL,
    name            VARCHAR(50) NOT NULL,

    CONSTRAINT pk_unit PRIMARY KEY(id)
)ENGINE=INNODB;

INSERT INTO units VALUES(NULL, "KG");
INSERT INTO units VALUES(NULL, "LT");
INSERT INTO units VALUES(NULL, "Mts");