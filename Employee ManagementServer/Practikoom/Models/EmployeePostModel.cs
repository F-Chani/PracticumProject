using Practicum.Core.DTOs;
using Practicum.Entities;
using System;

namespace Practicum.Models
{
    public class EmployeePostModel
    {
        public string Identity { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartOfWorkDate { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public List<PositionEmployeePostModel> PositionEmployees { get; set; }
    }
}

