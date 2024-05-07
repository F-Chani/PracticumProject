using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Practicum.Core.DTOs;
using Practicum.Core.Services;
using Practicum.Entities;
using Practicum.Models;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Practicum.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IPositionService _positionService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeService, IPositionService positionService, IMapper mapper)
        {
            _employeeService = employeeService;
            _positionService = positionService;
            _mapper = mapper;
        }
        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var employees = await _employeeService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
        }
        // GET api/<EmployeeController>/5
        [HttpGet("{identity}")]
        public async Task<IActionResult> Get(string identity)
        {
            var employee = await _employeeService.GetByIdAsync(identity);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }
        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EmployeePostModel model)
        {
            // בדיקת תקינות שדות המודל
            if (string.IsNullOrWhiteSpace(model.Identity))
            {
                ModelState.AddModelError("Identity", "Identity is required.");
            }
            else if (!Regex.IsMatch(model.Identity, @"^\d{9}$"))
            {
                ModelState.AddModelError("Identity", "Identity must be exactly 9 digits.");
            }

            if (string.IsNullOrWhiteSpace(model.FirstName))
            {
                ModelState.AddModelError("FirstName", "First name is required.");
            }
            else if (!Regex.IsMatch(model.FirstName, @"^[A-Za-z]{2,}$"))
            {
                ModelState.AddModelError("FirstName", "First name must contain only letters and be at least 2 characters long.");
            }

            if (string.IsNullOrWhiteSpace(model.LastName))
            {
                ModelState.AddModelError("LastName", "Last name is required.");
            }
            else if (!Regex.IsMatch(model.LastName, @"^[A-Za-z]+$"))
            {
                ModelState.AddModelError("LastName", "Last name must contain only letters.");
            }

            if (string.IsNullOrWhiteSpace(model.Gender))
            {
                ModelState.AddModelError("Gender", "Gender is required.");
            }

            if (model.StartOfWorkDate == default(DateTime))
            {
                ModelState.AddModelError("StartOfWorkDate", "Start of work date is required.");
            }
            else if (model.StartOfWorkDate <= model.DateOfBirth)
            {
                ModelState.AddModelError("StartOfWorkDate", "Start of work date cannot be before date of birth");
                return BadRequest(ModelState); 
            }
            if (model.DateOfBirth == default(DateTime))
            {
                ModelState.AddModelError("DateOfBirth", "Date of birth is required.");
            }
            else if (model.DateOfBirth >= DateTime.Today.AddYears(-18)) // ודא שהעובד מעל גיל 18
            {
                ModelState.AddModelError("DateOfBirth", "Employee must be at least 18 years old.");
            }

            // בדיקת תקינות שדות התפקידים
            if (model.PositionEmployees == null || model.PositionEmployees.Count == 0)
            {
                ModelState.AddModelError("PositionEmployees", "Position employees are required.");
            }
            else
            {
                foreach (var positionEmployee in model.PositionEmployees)
                {
                    if (positionEmployee.PositionId <= 0)
                    {
                        ModelState.AddModelError("PositionEmployees.PositionId", "Invalid position id.");
                    }

                    if (positionEmployee.DateOfEntry == default(DateTime))
                    {
                        ModelState.AddModelError("PositionEmployees.DateOfEntry", "Date of entry is required.");
                    }
                    else if (positionEmployee.DateOfEntry <= model.StartOfWorkDate)
                    {
                        ModelState.AddModelError("PositionEmployees.DateOfEntry", "Date of entry must be after start of work date.");
                    }
                }
            }

            // בדיקת תקינות מודל הבקשה
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // יצירת אובייקט עובד מועבר מהמודל
            Employee addEmployee = _mapper.Map<Employee>(model);
            addEmployee.PositionEmployees = new List<PositionEmployee>();

            // הוספת תפקידים לעובד
            foreach (PositionEmployeePostModel e in model.PositionEmployees)
            {
                Position position = await _positionService.GetByIdAsync(e.PositionId);
                if (position == null)
                {
                    ModelState.AddModelError("PositionEmployees", $"Position with id {e.PositionId} not found.");
                    return BadRequest(ModelState);
                }

                PositionEmployee positionEmployee = _mapper.Map<PositionEmployee>(e);
                positionEmployee.Position = position;
                addEmployee.PositionEmployees.Add(positionEmployee);
            }

            // שמירת העובד בשירות המתאים
            await _employeeService.AddAsync(addEmployee);

            // החזרת תגובת ההצלחה עם נתוני העובד החדש
            return Ok(_mapper.Map<EmployeeDto>(addEmployee));
        }


        // PUT api/<EmployeeController>/5
        [HttpPut("{currentIdentity}")]
        public async Task<ActionResult> Put(string currentIdentity, string newIdentity, EmployeePostModel model)
        {
            if (string.IsNullOrWhiteSpace(currentIdentity) || string.IsNullOrWhiteSpace(newIdentity))
            {
                return BadRequest("Invalid identity provided.");
            }

            // בדיקת תקינות שדות המודל
            if (string.IsNullOrWhiteSpace(model.Identity))
            {
                ModelState.AddModelError("Identity", "Identity is required.");
            }
            else if (!Regex.IsMatch(model.Identity, @"^\d{9}$"))
            {
                ModelState.AddModelError("Identity", "Identity must be exactly 9 digits.");
            }

            if (string.IsNullOrWhiteSpace(model.FirstName))
            {
                ModelState.AddModelError("FirstName", "First name is required.");
            }
            else if (!Regex.IsMatch(model.FirstName, @"^[A-Za-z]{2,}$"))
            {
                ModelState.AddModelError("FirstName", "First name must contain only letters and be at least 2 characters long.");
            }

            if (string.IsNullOrWhiteSpace(model.LastName))
            {
                ModelState.AddModelError("LastName", "Last name is required.");
            }
            else if (!Regex.IsMatch(model.LastName, @"^[A-Za-z]{2,}$"))
            {
                ModelState.AddModelError("LastName", "Last name must contain only letters and be at least 2 characters long.");
            }

            if (string.IsNullOrWhiteSpace(model.Gender))
            {
                ModelState.AddModelError("Gender", "Gender is required.");
            }

            if (model.StartOfWorkDate == default(DateTime))
            {
                ModelState.AddModelError("StartOfWorkDate", "Start of work date is required.");
            }

            if (model.DateOfBirth == default(DateTime))
            {
                ModelState.AddModelError("DateOfBirth", "Date of birth is required.");
            }
            else if (model.DateOfBirth >= DateTime.Today.AddYears(-18)) // ודא שהעובד מעל גיל 18
            {
                ModelState.AddModelError("DateOfBirth", "Employee must be at least 18 years old.");
            }

            if (model.StartOfWorkDate <= model.DateOfBirth)
            {
                ModelState.AddModelError("StartOfWorkDate", "Start of work date cannot be before date of birth");
                return BadRequest(ModelState); 
            }
            if (model.PositionEmployees.Any(p => p.DateOfEntry < model.StartOfWorkDate))
            {
                ModelState.AddModelError("EntryDate", "Entry date must be after start of work date");
                return BadRequest(ModelState);
            }

            // אם התקינות של המודל תקינה, בצע את העדכון
            Employee employee = _mapper.Map<Employee>(model);
            var updatedEmployee = await _employeeService.UpdateAsync(currentIdentity, newIdentity, employee);

            if (updatedEmployee == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<EmployeeDto>(updatedEmployee));
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{identity}")]
        public async Task<ActionResult> Delete(string identity)
        {
            var employeeToDelete = await _employeeService.GetByIdAsync(identity);
            if (employeeToDelete == null)
                return NotFound();

            if (!employeeToDelete.Status)
                return BadRequest("Employee is no longer active");

            await _employeeService.DeleteAsync(identity);
            return NoContent();
        }
    }
}
