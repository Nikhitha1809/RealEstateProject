using AutoMapper;
using WebApi.Models;
using WebApi.Dtos;
namespace WebApi.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDto>().ReverseMap();
        }
    }
}