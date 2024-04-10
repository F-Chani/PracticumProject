using Practicum.Entities;
using System;

namespace Practicum.Core.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string Identity { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartOfWorkDate { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public bool Status { get; set; }
        public List<PositionEmployee> positionEmployees { get; set; }


    }
}
