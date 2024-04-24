using Microsoft.EntityFrameworkCore;
using Practicum.Core.Repositories;
using Practicum.Entities;
using Practicum.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Practicum.Core.Services;

namespace Practicum.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        private readonly IPositionService _positionService;
        public EmployeeRepository(DataContext dataContext, IPositionService positionService)
        {
            _positionService = positionService;
            _context = dataContext;
        }
        public async Task<List<Employee>> GetAllAsync()
        {
            return await _context.Employees.Include(e => e.PositionEmployees).ThenInclude(p => p.Position).Where(e => e.Status).ToListAsync();
        }
        public async Task<Employee> GetByIdAsync(string employeeId)//אין אפשרות לקבל עובד שהסטטוס שלו שלילי
        {
            return await _context.Employees.Include(em => em.PositionEmployees).ThenInclude(p => p.Position).FirstOrDefaultAsync(p => p.Identity == employeeId && p.Status);
        }
        public async Task<Employee> AddAsync(Employee employee)
        {
            employee.Status = true;
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }
        /*
        public async Task<Employee> UpdateAsync(string identity, Employee employee)
        {
            var updateEmployee = await _context.Employees.Include(e => e.PositionEmployees).FirstOrDefaultAsync(e => e.Identity == identity);

            if (updateEmployee != null)
            {
                updateEmployee.FirstName = employee.FirstName;
                updateEmployee.LastName = employee.LastName;
                updateEmployee.Identity = employee.Identity;
                updateEmployee.Gender = employee.Gender;
                updateEmployee.StartOfWorkDate = employee.StartOfWorkDate;
                updateEmployee.DateOfBirth = employee.DateOfBirth;
                updateEmployee.Status = employee.Status;

                // נקה את רשימת התפקידים הקיימת והוסף מחדש
                updateEmployee.PositionEmployees.Clear();

                foreach (var newPosition in employee.PositionEmployees)
                {
                    var position = await _positionService.GetByIdAsync(newPosition.PositionId);
                    if (position != null)
                    {
                        updateEmployee.PositionEmployees.Add(new PositionEmployee
                        {
                            Position = position,
                            IsAdmin = newPosition.IsAdmin,
                            DateOfEntry = newPosition.DateOfEntry
                        });
                    }
                }
                // שמירת השינויים בבסיס הנתונים
                await _context.SaveChangesAsync();
            }
            return updateEmployee;
        }
  */
        public async Task<Employee> UpdateAsync(string currentIdentity, string newIdentity, Employee employee)
        {
            var existingEmployee = await _context.Employees
                .Include(e => e.PositionEmployees)
                .FirstOrDefaultAsync(e => e.Identity == currentIdentity);

            if (existingEmployee == null)
            {
                throw new InvalidOperationException($"Employee with Identity {currentIdentity} not found.");
            }

            // עדכון פרטי העובד
            existingEmployee.Identity = employee.Identity;
            existingEmployee.FirstName = employee.FirstName;
            existingEmployee.LastName = employee.LastName;
            existingEmployee.StartOfWorkDate = employee.StartOfWorkDate;
            existingEmployee.DateOfBirth = employee.DateOfBirth;
            existingEmployee.Gender = employee.Gender;
            existingEmployee.Status = true;

            // עדכון רשומות התפקידים
            existingEmployee.PositionEmployees.Clear();
            foreach (var newPosition in employee.PositionEmployees)
            {
                var position = await _context.Positions.FindAsync(newPosition.PositionId);
                if (position != null)
                {
                    existingEmployee.PositionEmployees.Add(new PositionEmployee
                    {
                        Position = position,
                        IsAdmin = newPosition.IsAdmin,
                        DateOfEntry = newPosition.DateOfEntry
                    });
                }
            }

            await _context.SaveChangesAsync();

            return existingEmployee;
        }


        public async Task DeleteAsync(string identity)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.Identity == identity);
            if (employee != null)
            {
                employee.Status = false;
                await _context.SaveChangesAsync();
            }
        }

    }
}
