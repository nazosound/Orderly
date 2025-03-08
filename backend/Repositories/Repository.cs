using System.Linq.Expressions;
using backend.DTOs;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly OrderlyContext _context;
    private readonly DbSet<T> _dbSet;

    public Repository(OrderlyContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }

    public async Task<List<T>> GetAllAsync() => await _dbSet.ToListAsync();
    public async Task<T?> GetByIdAsync(int id) => await _dbSet.FindAsync(id);

    public async Task<List<T>> GetWithConditionAsync(
        Expression<Func<T, bool>> predicate,
        Expression<Func<T, object>>? orderBy = null)
    {
        if (orderBy is not null)
            return await _dbSet.Where(predicate).OrderBy(orderBy).ToListAsync();
        return await _dbSet.Where(predicate).ToListAsync();
    }


    public async Task<PaginatedList<List<T>>> GetListPaginatedAsync(
        int pageNumber,
        int pageSize,
        Expression<Func<T, bool>>? predicate = null,
        Expression<Func<T, object>>? orderBy = null,
        bool? ascending = true)
    {
        IQueryable<T> query = _dbSet;
        if (predicate is not null)
            query = query.Where(predicate);

        if (orderBy is not null)
            query = ascending == true ? query.OrderBy(orderBy) : query.OrderByDescending(orderBy);

        var totalPages = await query.CountAsync();

        query = query.Skip((pageNumber - 1) * pageSize).Take(pageSize);

        return new PaginatedList<List<T>>(Convert.ToInt32(Math.Ceiling(Convert.ToDouble(totalPages) / pageSize)), await query.ToListAsync());
    }

    public async Task<T> AddAsync(T entity)
    {
        _context.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<T> UpdateAsync(T entity)
    {
        _context.Update(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(int id)
    {
        var product = await GetByIdAsync(id);
        if (product is not null)
        {
            _context.Remove(product);
            await _context.SaveChangesAsync();
        }
    }

}