using AutoMapper;
using Practicum.Entities;
using Practicum.Models;

namespace Practicum.Mapping
{
    public class PostModelsMappingProfile : Profile
    {
        public PostModelsMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>()
           .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => Enum.Parse<Gender>(src.Gender, true)));
            CreateMap<PositionEmployeePostModel, PositionEmployee>();
            CreateMap<PositionPostModel, Position>();
        }
    }
}
