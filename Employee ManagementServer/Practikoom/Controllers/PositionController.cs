using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Practicum.Core.DTOs;
using Practicum.Core.Services;
using Practicum.Entities;

using Practicum.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Practicum.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly IPositionService _positionService;
        private readonly IMapper _mapper;

        public PositionController(IPositionService positionService, IMapper mapper)
        {
            _positionService = positionService; 
            _mapper= mapper;    
        }
        // GET: api/<PositionController>
        [HttpGet]
        public async Task<ActionResult> GetAllAsync()
        {
            var positions = await _positionService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<PositionDto>>(positions));
        }
        // GET api/<PositionController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var position = await _positionService.GetByIdAsync(id);
            if(position is null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<PositionDto>(position));
        }

        // POST api/<PositionController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PositionPostModel model)
        {
            var position =await _positionService.AddAsync(_mapper.Map<Position>(model));
            return Ok(_mapper.Map<PositionDto>(position));
        }
        /*
        // PUT api/<PositionController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] PositionPostModel model)
        {
            var position = await _positionService.GetByIdAsync(id);
            if (position is null)
                return NotFound();
            _mapper.Map(model, position);
            await _positionService.UpdateAsync(position);
            position = await _positionService.GetByIdAsync(id);
            return Ok(_mapper.Map<PositionDto>(position));
        }

        // DELETE api/<PositionController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var position = await _positionService.GetByIdAsync(id);
            if (position is null)
                return NotFound();
            await _positionService.DeleteAsync(id);
            return NoContent();
        }
        */
    }
}
