using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.DTOs
{
    public class PositionEmployeeDto
    {
        public PositionDto Position { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime DateOfEntry { get; set; }
    }
}
