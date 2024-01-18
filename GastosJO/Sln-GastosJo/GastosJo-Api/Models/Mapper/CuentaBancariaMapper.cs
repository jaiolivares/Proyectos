using AutoMapper;
using GastosJo_Api.Models.Dto;
using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Mapper
{
    public class CuentaBancariaMapper : Profile
    {
        public CuentaBancariaMapper()
        {
            CreateMap<CuentaBancariaRequest, CuentaBancaria>();

            CreateMap<CuentaBancaria, CuentaBancariaResponse>()
                .ForMember(dest => dest.Resultado, opt => opt.MapFrom(src => new Resultado()));
        }
    }
}