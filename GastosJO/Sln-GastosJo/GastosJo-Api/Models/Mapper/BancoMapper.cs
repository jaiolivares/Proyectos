using AutoMapper;
using GastosJo_Api.Models.Data;

namespace GastosJo_Api.Models.Mapper
{
    public class BancoMapper : Profile
    {
        public BancoMapper()
        {
            CreateMap<BancoRequest, Banco>();
        }
    }
}