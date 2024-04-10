using Practicum.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Services
{
    public interface IPositionEmployeeService
    {
        Task<IEnumerable<PositionEmployee>> GetAllAsync();
        Task<PositionEmployee> GetByEmployeeIdPositionIdAsync(int employeeId, int positionId);
        Task <IEnumerable<PositionEmployee>> GetByPositionIdAsync(int positionEmployeeId);
        Task<PositionEmployee> AddAsync(int positionId, int employeeId, PositionEmployee employee);
        Task<PositionEmployee> UpdateAsync(int employeeId, int positionId, PositionEmployee employee);
        Task DeleteAsync(int employeeId, int positionId);
    }
}
