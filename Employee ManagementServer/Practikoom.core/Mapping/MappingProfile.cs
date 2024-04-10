using AutoMapper;
using Practicum.Core.DTOs;
using Practicum.Entities;
using System.Data;

namespace Practicum.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeeDto>().ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender.ToString()));
            CreateMap<Position, PositionDto>().ReverseMap();
            CreateMap<PositionEmployee, PositionEmployeeDto>().ReverseMap();
        }
    }
}
