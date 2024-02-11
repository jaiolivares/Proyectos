using AutoMapper;
using GastosJo_Api.Models.Dto;
using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Mapper
{
    public class TipoDeCuentaMapper : Profile
    {
        public TipoDeCuentaMapper()
        {
            CreateMap<TipoDeCuentaRequest, TipoDeCuenta>();

            CreateMap<TipoDeCuenta, TipoDeCuentaResponse>()
                .ForMember(dest => dest.Resultado, opt => opt.MapFrom(src => new Resultado()));
        }
    }
}