using AutoMapper;
using GastosJo_Api.Models.Data;

namespace GastosJo_Api.Models.Mapper
{
    public class CuentaBancariaMapper : Profile
    {
        public CuentaBancariaMapper()
        {
            CreateMap<CuentaBancariaRequest, CuentaBancaria>();
        }
    }
}