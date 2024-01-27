using AutoMapper;
using GastosJo_Api.Models.Dto;
using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Mapper
{
    public class EmpresaDeGastoMapper : Profile
    {
        public EmpresaDeGastoMapper()
        {
            CreateMap<EmpresaDeGastoRequest, EmpresaDeGasto>();

            CreateMap<EmpresaDeGasto, EmpresaDeGastoResponse>()
                .ForMember(dest => dest.Resultado, opt => opt.MapFrom(src => new Resultado()));
        }
    }
}