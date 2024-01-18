using Microsoft.EntityFrameworkCore;
using GastosJo_Api.Data;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Services;
using GastosJo_Api.Repositories;

var builder = WebApplication.CreateBuilder(args);

ConfigureDb();
ConfigureServices();
ConfigureApp();

void ConfigureDb()
{
    builder.Services.AddDbContext<GastosJo_ApiContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("GastosJo_ApiContext") ?? throw new InvalidOperationException("Connection string 'GastosJo_ApiContext' not found.")));
}

void ConfigureServices()
{
    builder.Services.AddAutoMapper(typeof(Program));
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddScoped<IBancoService, BancoService>();
    builder.Services.AddScoped<IBancoRepository, BancoRepository>();
    builder.Services.AddScoped<ITipoDeCuentaService, TipoDeCuentaService>();
    builder.Services.AddScoped<ITipoDeCuentaRepository, TipoDeCuentaRepository>();
    builder.Services.AddScoped<ICuentaBancariaService, CuentaBancariaService>();
    builder.Services.AddScoped<ICuentaBancariaRepository, CuentaBancariaRepository>();
}

void ConfigureApp()
{
    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}