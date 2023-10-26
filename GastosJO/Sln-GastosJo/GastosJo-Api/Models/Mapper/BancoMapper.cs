using AutoMapper;
using GastosJo_Api.Models.Respuesta;

namespace GastosJo_Api.Models.Mapper
{
    public class BancoMapper : Profile
    {
        public BancoMapper()
        {
            CreateMap<BancoContratoRequest, Banco>();
        }
    }
}