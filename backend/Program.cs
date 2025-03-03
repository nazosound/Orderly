using System.Text;
using backend.Repositories;
using backend.Interfaces;
using backend.Middleware;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

// NARIASDEV : JWT validator - configuration
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(jwtBearerOptions =>
        {
            jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateActor = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["JWT:Issuer"],
                ValidAudience = builder.Configuration["JWT:Audience"],
                ClockSkew = TimeSpan.Zero,
                IssuerSigningKey =
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:SecretKey"]!))
            };

        }
    );

var dbEngine = builder.Configuration["DBENGINE"];

if (dbEngine == "POSTGRES")
{
    builder.Services.AddDbContext<OrderlyContext>((s) =>
        s.UseNpgsql(builder.Configuration.GetConnectionString("dbContextStrPOSTGRESQL")));
}
else
{
    builder.Services.AddDbContext<OrderlyContext>((s) =>
        s.UseSqlServer(builder.Configuration.GetConnectionString("dbContextStrMSSQL")));
}


builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddTransient<AuthService>();
builder.Services.AddTransient<TokenJwtService>();
builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<CategoryService>();
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
builder.Services.AddCors(options =>
    options.AddPolicy(name: "OrderlyPolicy",
        (policyBuilder) =>
            policyBuilder.WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
    ));

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// app.UseHttpsRedirection();
app.UseCors("OrderlyPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<ExceptionMiddleware>();

app.MapControllers();
app.Run();