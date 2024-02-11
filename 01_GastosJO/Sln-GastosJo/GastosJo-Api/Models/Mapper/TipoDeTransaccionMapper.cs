using AutoMapper;
using GastosJo_Api.Models.Dto;
using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Mapper
{
    public class TipoDeTransaccionMapper : Profile
    {
        public TipoDeTransaccionMapper()
        {
            CreateMap<TipoDeTransaccionRequest, TipoDeTransaccion>();

            CreateMap<TipoDeTransaccion, TipoDeTransaccionResponse>()
                .ForMember(dest => dest.Resultado, opt => opt.MapFrom(src => new Resultado()));
        }
    }
}