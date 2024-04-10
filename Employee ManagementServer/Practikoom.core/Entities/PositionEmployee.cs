using System.ComponentModel.DataAnnotations;

namespace Practicum.Entities
{
    public class PositionEmployee
    {
        public int EmployeeId { get; set; }
        public Position Position { get; set; }
        public int PositionId { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime DateOfEntry { get; set; }//תאריך כניסת העובד לעבודה
    }
}
