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
    public class PositionService : IPositionService
    {
        private readonly IPositionRepository _positionRepository;
        public PositionService(IPositionRepository positionRepository)
        {
            _positionRepository = positionRepository;
        }
        public async Task<Position> AddAsync(Position position)
        {
            return await _positionRepository.AddAsync(position);
        }
       
        public async Task<IEnumerable<Position>> GetAllAsync()
        {
            return await _positionRepository.GetAllAsync();
        }

        public async Task<Position> GetByIdAsync(int positionId)
        {
            return await _positionRepository.GetByIdAsync(positionId);
        }

        /*
         public async Task<Position> UpdateAsync(Position position)
       {
           return await _positionRepository.UpdateAsync(position);
       }
       public async Task DeleteAsync(int positionId)
       {
           await _positionRepository.DeleteAsync(positionId);
       }
       */
    }
}
