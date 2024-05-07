using Practicum.Core.Repositories;
using Practicum.Core.Services;
using Practicum.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Service.Services
{

    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<Employee> AddAsync(Employee employee)
        {
            return await _employeeRepository.AddAsync(employee);
        }

        public async Task DeleteAsync(string employeeId)
        {
            await _employeeRepository.DeleteAsync(employeeId);
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _employeeRepository.GetAllAsync();
        }

        public async Task<Employee> GetByIdAsync(string employeeId)
        {
            return await _employeeRepository.GetByIdAsync(employeeId);
        }

        public async Task<Employee> UpdateAsync(string currentIdentity, string newIdentity, Employee employee)
        {
            return await _employeeRepository.UpdateAsync(currentIdentity, newIdentity, employee);
        }



    }
}
