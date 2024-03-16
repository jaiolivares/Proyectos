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
    builder.Services.AddScoped<ITipoDeTransaccionService, TipoDeTransaccionService>();
    builder.Services.AddScoped<ITipoDeTransaccionRepository, TipoDeTransaccionRepository>();
    builder.Services.AddScoped<IOrigenDeGastoService, OrigenDeGastoService>();
    builder.Services.AddScoped<IOrigenDeGastoRepository, OrigenDeGastoRepository>();
    builder.Services.AddScoped<IEmpresaDeGastoService, EmpresaDeGastoService>();
    builder.Services.AddScoped<IEmpresaDeGastoRepository, EmpresaDeGastoRepository>();
}

void ConfigureApp()
{
    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    //if (app.Environment.IsProduction())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}