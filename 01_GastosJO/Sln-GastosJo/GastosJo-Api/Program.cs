using Microsoft.EntityFrameworkCore;
using GastosJo_Api.Data;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Services;
using GastosJo_Api.Repositories;
using GastosJo_Api.Interfaces.Repository;
using GastosJo_Api.Interfaces.Service;
using GastosJo_Api.Models.Helpers;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
IConfigurationSection appSettingsSection;
AppSettings appSettings;
string _MyCors = "MyCors";

ConfigureDb();
ConfigureAppSettings();
ConfigureJwt();
ConfigureServices();
ConfigureApp();

void ConfigureDb()
{
    builder.Services.AddDbContext<GastosJo_ApiContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("GastosJo_ApiContext") ?? throw new InvalidOperationException("Connection string 'GastosJo_ApiContext' not encontrada.")));
}
void ConfigureAppSettings()
{
    appSettingsSection = builder.Configuration.GetSection("AppSettings");
    appSettings = appSettingsSection.Get<AppSettings>();
    builder.Services.Configure<AppSettings>(appSettingsSection);
}

void ConfigureJwt()
{
    var llaveJwt = Encoding.ASCII.GetBytes(appSettings.SecretoJwt);
    builder.Services.AddAuthentication(d =>
    {
        d.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        d.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })

    .AddJwtBearer(d =>
    {
        d.RequireHttpsMetadata = false;
        d.SaveToken = true;
        d.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(llaveJwt),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true
        };
    });
}

void ConfigureServices()
{
    builder.Services.AddAutoMapper(typeof(Program));
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();

    //builder.Services.AddSwaggerGen();
    //Se agrega esta sección para tener el Authorize dentro de Swagger
    builder.Services.AddSwaggerGen(options =>
    {
        options.AddSecurityDefinition("oauth2", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey
        });
        options.OperationFilter<SecurityRequirementsOperationFilter>();
    });

    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: _MyCors, builder =>
        {
            builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost").AllowAnyHeader().AllowAnyMethod();
        });

        //options.AddPolicy(name: _MyCors, policy =>
        //{
        //    policy.WithOrigins("http://example.com",
        //                        "http://www.contoso.com");
        //});
    });
    builder.Services.AddScoped<ILoginService, LoginService>();
    builder.Services.AddScoped<IUsuarioService, UsuarioService>();
    builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
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

    app.UseCors(_MyCors);

    app.UseAuthentication();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}