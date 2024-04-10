using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Practicum.Entities
{
    public enum Gender
    {
        Male,
        Female
    }

    public class Employee
    {
        public int Id { get; set; }
        public string Identity { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartOfWorkDate { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public bool Status { get; set; } = true;
        public List<PositionEmployee> PositionEmployees { get; set; }
    }
}
