using AutoMapper;
using GastosJo_Api.Models.Dto;
using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Mapper
{
    public class BancoMapper : Profile
    {
        public BancoMapper()
        {
            CreateMap<BancoRequest, Banco>();

            CreateMap<Banco, BancoResponse>()
                .ForMember(dest => dest.Resultado, opt => opt.MapFrom(src => new Resultado()));
        }
    }
}