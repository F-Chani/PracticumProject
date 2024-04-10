using Microsoft.EntityFrameworkCore;
using Practicum.Core.Repositories;
using Practicum.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Data.Repositories
{
    public class PositionRepository : IPositionRepository
    {
        private readonly DataContext _context;
        public PositionRepository(DataContext dataContext)
        {
                _context= dataContext;  
        }

        public async Task<IEnumerable<Position>> GetAllAsync()
        {
            return await _context.Positions.ToListAsync();
        }

        public async Task<Position> GetByIdAsync(int positionId)
        {
            return await _context.Positions.FirstAsync(p => p.Id == positionId);
        }
        public async Task<Position> AddAsync(Position position)
        {
            _context.Positions.Add(position);
            await _context.SaveChangesAsync();
            return position;
        }
        /*
        public async Task<Position> UpdateAsync(Position position)
        {
            var existPosition=await GetByIdAsync(position.Id);
            _context.Entry(existPosition).CurrentValues.SetValues(position);
            await _context.SaveChangesAsync();
            return position;
        }
        public async Task DeleteAsync(int positionId)
        {
            var position = await GetByIdAsync(positionId);
            _context.Positions.Remove(position);
            await _context.SaveChangesAsync();
        }
        */
    }
}
