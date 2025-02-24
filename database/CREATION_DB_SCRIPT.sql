/*
    Nariasdev - 2025
    Database creation script for Orderly

    Example Data:

    insert into ENTITIES (entityName) values ('NARIASDEV')
    insert into USERS ([idEntity],email,userPassword,userName,userRole)
    values (1,'narias.as@gmail.com','pass123','Nicolas Arias Venta','SALES')


*/

CREATE TABLE ENTITIES
(
    [id] int primary key IDENTITY (1,1),
    [entityName] varchar(100) unique,
    [entityStatus] bit default 1,
    [createdDate] datetime default getdate()
)

GO


CREATE TABLE USERS
(
    [id] int primary key IDENTITY (1,1),
    [idEntity] int,
    [email] varchar(100) unique,
    [userPassword] varchar(100) not null,
    [userName] varchar(150) not null,
    [userRole] varchar(15) not null,
    [userStatus] bit default 1,
    [refreshToken] varchar(150),
    [refreshTokenExpiryTime] datetime,
    [createdDate] datetime default getdate(),
    foreign key ([idEntity]) references ENTITIES ([id]) ON DELETE SET NULL
)

 

GO

CREATE TABLE PARAMETERS
(
    [id] int primary key IDENTITY (1,1),
    [idEntity] int,
    [parameter] varchar(50) not null,
    [value] varchar(100) not null,
    foreign key ([idEntity]) references ENTITIES ([id]) ON DELETE SET NULL
)

GO

CREATE TABLE CATEGORIES
(
    [id] int primary key IDENTITY (1,1),
    [idEntity] int,
    [categoryName] varchar(100) not null,
    [categoryStatus] bit default 1,
    foreign key ([idEntity]) references ENTITIES ([id]) ON DELETE SET NULL
)

GO

CREATE TABLE PRODUCTS
(
    [id] int primary key IDENTITY (1,1),
    [idEntity] int,
    [idCategory] int,
    [productName] varchar(100) not null,
    [productImageUrl] varchar(250),
    [productCost] numeric(15,2),
    [productSell] numeric(15,2) not null,
    [productQuantity] int,
    [productStatus] bit default 1,
    [productCurrency] varchar(5),
    [barCode] varchar(150),
    [createdDate] datetime default getdate(),

    foreign key ([idEntity]) references ENTITIES ([id]) ON DELETE SET NULL,
    foreign key ([idCategory]) references CATEGORIES ([id]) ON DELETE SET NULL

)

GO

CREATE TABLE ACCOUNTS
(
    [id] int primary key IDENTITY (1,1),
    [idEntity] int,
    [accountName] varchar(50) not null,
    [accountDescription] varchar(150),
    [accountStatus] bit default 1,
    [createdDate] datetime default getdate(),

    foreign key ([idEntity]) references ENTITIES ([id]) ON DELETE SET NULL
)

GO

CREATE TABLE SALES
(
    [id] int primary key IDENTITY (1,1),
    [idEntity] int,
    [idAccount] int,
    [idUser] int,
    [totalSale] numeric(15,2) not null,
    [totalItems] int not null,
    [createdDate] datetime default getdate(),

    foreign key ([idEntity]) references ENTITIES ([id]) ON DELETE SET NULL,
    foreign key ([idUser]) references USERS ([id]) ON DELETE SET NULL,
    foreign key ([idAccount]) references ACCOUNTS ([id]) ON DELETE SET NULL
)

GO

CREATE TABLE SALEDETAILS
(
    [id] int primary key IDENTITY (1,1),
    [idSale] int,
    [idProduct] int,
    [productSellUnit] numeric(15,2) not null,
    [productSellTotal] numeric(15,2) not null,
    [productQuantity] int not null,

    foreign key ([idSale]) references SALES ([id]) ON DELETE CASCADE,
    foreign key ([idProduct]) references PRODUCTS ([id])

)

GO

CREATE TABLE LOGGING
(
    [id] int primary key IDENTITY (1,1),
    [idUser] int,
    [message] varchar(500),
    [createdDate] datetime default getdate(),

    foreign key ([idUser]) references USERS ([id]) ON DELETE SET NULL
)
go


 