using Practicum.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Repositories
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAllAsync();
        Task<Employee> GetByIdAsync(string identity);
        Task<Employee> AddAsync(Employee employee);
        Task<Employee> UpdateAsync(string currentIdentity, string newIdentity, Employee employee);
        Task DeleteAsync(string employeeId);
    }
}
