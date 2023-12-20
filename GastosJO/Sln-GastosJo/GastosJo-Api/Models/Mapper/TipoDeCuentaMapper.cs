using AutoMapper;
using GastosJo_Api.Models.Data;

namespace GastosJo_Api.Models.Mapper
{
    public class TipoDeCuentaMapper : Profile
    {
        public TipoDeCuentaMapper()
        {
            CreateMap<TipoDeCuentaRequest, TipoDeCuenta>();
        }
    }
}