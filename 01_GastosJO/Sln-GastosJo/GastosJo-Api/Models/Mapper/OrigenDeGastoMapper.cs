using AutoMapper;
using GastosJo_Api.Models.Dto;
using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Mapper
{
    public class OrigenDeGastoMapper : Profile
    {
        public OrigenDeGastoMapper()
        {
            CreateMap<OrigenDeGastoRequest, OrigenDeGasto>();

            CreateMap<OrigenDeGasto, OrigenDeGastoResponse>()
                .ForMember(dest => dest.Resultado, opt => opt.MapFrom(src => new Resultado()));
        }
    }
}