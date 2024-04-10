using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Practicum.Core.DTOs;
using Practicum.Core.Services;
using Practicum.Entities;
using Practicum.Models;
using System.Collections.Generic;
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

        public EmployeeController(IEmployeeService employeeService,IPositionService positionService, IMapper mapper)
        {
            _employeeService = employeeService;
            _positionService= positionService;  
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
            Employee addEmployee = _mapper.Map<Employee>(model);
            addEmployee.PositionEmployees=new List<PositionEmployee>();
            foreach(PositionEmployeePostModel e in model.PositionEmployees)
            {
                Position position=await _positionService.GetByIdAsync(e.PositionId);
                PositionEmployee positionEmployee = _mapper.Map<PositionEmployee>(e);
                positionEmployee.Position = position;
                addEmployee.PositionEmployees.Add(positionEmployee);
            }
            await _employeeService.AddAsync(addEmployee);
            return Ok(_mapper.Map<EmployeeDto>(addEmployee));
        }
        // PUT api/<EmployeeController>/5
          [HttpPut("{currentIdentity}")]
        public async Task<ActionResult> Put(string currentIdentity, string newIdentity, EmployeePostModel model)
        {
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
            var employee = await _employeeService.GetByIdAsync(identity);
            if (employee.Status == false)
                return NotFound();

            await _employeeService.DeleteAsync(identity);
            return NoContent();
        }
    }
}
