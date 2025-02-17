using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public partial class OrderlyContext : DbContext
{
    public OrderlyContext()
    {
    }

    public OrderlyContext(DbContextOptions<OrderlyContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }
    public virtual DbSet<Category> Categories { get; set; }
    public virtual DbSet<Entity> Entities { get; set; }
    public virtual DbSet<Logging> Loggings { get; set; }
    public virtual DbSet<Parameter> Parameters { get; set; }
    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<Sale> Sales { get; set; }
    public virtual DbSet<Saledetail> Saledetails { get; set; }
    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.ToTable("ACCOUNTS");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AccountDescription)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("accountDescription");
            entity.Property(e => e.AccountName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("accountName");
            entity.Property(e => e.AccountStatus)
                .HasDefaultValue(true)
                .HasColumnName("accountStatus");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdDate");
            entity.Property(e => e.IdEntity).HasColumnName("idEntity");
            entity.HasOne(d => d.IdEntityNavigation).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.IdEntity)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.ToTable("CATEGORIES");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("categoryName");
            entity.Property(e => e.CategoryStatus)
                .HasDefaultValue(true)
                .HasColumnName("categoryStatus");
            entity.Property(e => e.IdEntity).HasColumnName("idEntity");
            entity.HasOne(d => d.IdEntityNavigation).WithMany(p => p.Categories)
                .HasForeignKey(d => d.IdEntity)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<Entity>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.ToTable("ENTITIES");
            entity.HasIndex(e => e.EntityName).IsUnique();
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdDate");
            entity.Property(e => e.EntityName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("entityName");
            entity.Property(e => e.EntityStatus)
                .HasDefaultValue(true)
                .HasColumnName("entityStatus");
        });

        modelBuilder.Entity<Logging>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.ToTable("LOGGING");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdDate");
            entity.Property(e => e.IdUser).HasColumnName("idUser");
            entity.Property(e => e.Message)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("message");
            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.Loggings)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<Parameter>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.ToTable("PARAMETERS");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdEntity).HasColumnName("idEntity");
            entity.Property(e => e.Parameter1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("parameter");
            entity.Property(e => e.Value)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("value");
            entity.HasOne(d => d.IdEntityNavigation).WithMany(p => p.Parameters)
                .HasForeignKey(d => d.IdEntity)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.ToTable("PRODUCTS");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BarCode)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("barCode");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdDate");
            entity.Property(e => e.IdCategory).HasColumnName("idCategory");
            entity.Property(e => e.IdEntity).HasColumnName("idEntity");
            entity.Property(e => e.ProductCost)
                .HasColumnType("numeric(15, 2)")
                .HasColumnName("productCost");
            entity.Property(e => e.ProductCurrency)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("productCurrency");
            entity.Property(e => e.ProductImageUrl)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("productImageUrl");
            entity.Property(e => e.ProductName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("productName");
            entity.Property(e => e.ProductQuantity).HasColumnName("productQuantity");
            entity.Property(e => e.ProductSell)
                .HasColumnType("numeric(15, 2)")
                .HasColumnName("productSell");
            entity.Property(e => e.ProductStatus)
                .HasDefaultValue(true)
                .HasColumnName("productStatus");
            entity.HasOne(d => d.IdCategoryNavigation).WithMany(p => p.Products)
                .HasForeignKey(d => d.IdCategory)
                .OnDelete(DeleteBehavior.SetNull);
            entity.HasOne(d => d.IdEntityNavigation).WithMany(p => p.Products)
                .HasForeignKey(d => d.IdEntity)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<Sale>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.ToTable("SALES");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdDate");
            entity.Property(e => e.IdAccount).HasColumnName("idAccount");
            entity.Property(e => e.IdEntity).HasColumnName("idEntity");
            entity.Property(e => e.IdUser).HasColumnName("idUser");
            entity.Property(e => e.TotalItems).HasColumnName("totalItems");
            entity.Property(e => e.TotalSale)
                .HasColumnType("numeric(15, 2)")
                .HasColumnName("totalSale");
            entity.HasOne(d => d.IdAccountNavigation).WithMany(p => p.Sales)
                .HasForeignKey(d => d.IdAccount)
                .OnDelete(DeleteBehavior.SetNull);
            entity.HasOne(d => d.IdEntityNavigation).WithMany(p => p.Sales)
                .HasForeignKey(d => d.IdEntity)
                .OnDelete(DeleteBehavior.SetNull);
            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.Sales)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<Saledetail>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.ToTable("SALEDETAILS");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdProduct).HasColumnName("idProduct");
            entity.Property(e => e.IdSale).HasColumnName("idSale");
            entity.Property(e => e.ProductQuantity).HasColumnName("productQuantity");
            entity.Property(e => e.ProductSellTotal)
                .HasColumnType("numeric(15, 2)")
                .HasColumnName("productSellTotal");
            entity.Property(e => e.ProductSellUnit)
                .HasColumnType("numeric(15, 2)")
                .HasColumnName("productSellUnit");
            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Saledetails)
                .HasForeignKey(d => d.IdProduct);
            entity.HasOne(d => d.IdSaleNavigation).WithMany(p => p.Saledetails)
                .HasForeignKey(d => d.IdSale)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.ToTable("USERS");
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdDate");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.IdEntity).HasColumnName("idEntity");
            entity.Property(e => e.UserName)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("userName");
            entity.Property(e => e.UserPassword)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("userPassword");
            entity.Property(e => e.UserRole)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("userRole");
            entity.Property(e => e.UserStatus)
                .HasDefaultValue(true)
                .HasColumnName("userStatus");
            entity.Property(e => e.RefreshToken)
                .IsUnicode(false)
                .HasColumnName("refreshToken");
            entity.Property(e => e.RefreshTokenExpiry)
                .IsUnicode(false)
                .HasColumnName("refreshTokenExpiry");
            entity.HasOne(d => d.IdEntityNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.IdEntity)
                .OnDelete(DeleteBehavior.SetNull);
        });
    }
}
