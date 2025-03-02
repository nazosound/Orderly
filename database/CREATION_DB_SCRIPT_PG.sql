/*
    Nariasdev - 2025
    Database creation script for Orderly (PostgreSQL version)
*/

CREATE TABLE ENTITIES (
    id SERIAL PRIMARY KEY,
    entityName VARCHAR(100) UNIQUE,
    entityStatus BOOLEAN DEFAULT TRUE,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE USERS (
    id SERIAL PRIMARY KEY,
    idEntity INT,
    email VARCHAR(100) UNIQUE,
    userPassword VARCHAR(100) NOT NULL,
    userName VARCHAR(150) NOT NULL,
    userRole VARCHAR(15) NOT NULL,
    userStatus BOOLEAN DEFAULT TRUE,
    refreshToken VARCHAR(150),
    refreshTokenExpiry TIMESTAMP,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_entity FOREIGN KEY (idEntity) REFERENCES ENTITIES (id) ON DELETE SET NULL
);

CREATE TABLE PARAMETERS (
    id SERIAL PRIMARY KEY,
    idEntity INT,
    parameter VARCHAR(50) NOT NULL,
    value VARCHAR(100) NOT NULL,
    CONSTRAINT fk_parameters_entity FOREIGN KEY (idEntity) REFERENCES ENTITIES (id) ON DELETE SET NULL
);

CREATE TABLE CATEGORIES (
    id SERIAL PRIMARY KEY,
    idEntity INT,
    categoryName VARCHAR(100) NOT NULL,
    categoryStatus BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_categories_entity FOREIGN KEY (idEntity) REFERENCES ENTITIES (id) ON DELETE SET NULL
);

CREATE TABLE PRODUCTS (
    id SERIAL PRIMARY KEY,
    idEntity INT,
    idCategory INT,
    productName VARCHAR(100) NOT NULL,
    productImageUrl VARCHAR(250),
    productCost NUMERIC(15,2),
    productSell NUMERIC(15,2) NOT NULL,
    productQuantity INT,
    productStatus BOOLEAN DEFAULT TRUE,
    productCurrency VARCHAR(5),
    barCode VARCHAR(150),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_products_entity FOREIGN KEY (idEntity) REFERENCES ENTITIES (id) ON DELETE SET NULL,
    CONSTRAINT fk_products_category FOREIGN KEY (idCategory) REFERENCES CATEGORIES (id) ON DELETE SET NULL
);

CREATE TABLE ACCOUNTS (
    id SERIAL PRIMARY KEY,
    idEntity INT,
    accountName VARCHAR(50) NOT NULL,
    accountDescription VARCHAR(150),
    accountStatus BOOLEAN DEFAULT TRUE,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_accounts_entity FOREIGN KEY (idEntity) REFERENCES ENTITIES (id) ON DELETE SET NULL
);

CREATE TABLE SALES (
    id SERIAL PRIMARY KEY,
    idEntity INT,
    idAccount INT,
    idUser INT,
    totalSale NUMERIC(15,2) NOT NULL,
    totalItems INT NOT NULL,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sales_entity FOREIGN KEY (idEntity) REFERENCES ENTITIES (id) ON DELETE SET NULL,
    CONSTRAINT fk_sales_user FOREIGN KEY (idUser) REFERENCES USERS (id) ON DELETE SET NULL,
    CONSTRAINT fk_sales_account FOREIGN KEY (idAccount) REFERENCES ACCOUNTS (id) ON DELETE SET NULL
);

CREATE TABLE SALEDETAILS (
    id SERIAL PRIMARY KEY,
    idSale INT,
    idProduct INT,
    productSellUnit NUMERIC(15,2) NOT NULL,
    productSellTotal NUMERIC(15,2) NOT NULL,
    productQuantity INT NOT NULL,
    CONSTRAINT fk_saledetails_sale FOREIGN KEY (idSale) REFERENCES SALES (id) ON DELETE CASCADE,
    CONSTRAINT fk_saledetails_product FOREIGN KEY (idProduct) REFERENCES PRODUCTS (id)
);

CREATE TABLE LOGGING (
    id SERIAL PRIMARY KEY,
    idUser INT,
    message VARCHAR(500),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_logging_user FOREIGN KEY (idUser) REFERENCES USERS (id) ON DELETE SET NULL
);

/*
    Example Data:

    INSERT INTO ENTITIES (entityName) VALUES ('NARIASDEV');

    INSERT INTO USERS (idEntity, email, userPassword, userName, userRole)
    VALUES (1, 'narias.as@gmail.com', 'pass123', 'Nicolas Arias Venta', 'SALES');
*/
