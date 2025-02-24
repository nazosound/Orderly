using System.Linq.Expressions;

namespace backend.Interfaces;

public interface IRepository<T> where T : class
{
    Task<List<T>> GetAllAsync();
    Task<T?> GetByIdAsync(int id);
    Task<T> AddAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task DeleteAsync(int id);

    Task<List<T>> GetWithConditionAsync(Expression<Func<T, bool>> predicate,
        Expression<Func<T, object>>? orderBy = null);

    Task<(List<T> Items, int TotalPages)> GetListPaginatedAsync<TKey>(int pageNumber,
        int pageSize,
        Expression<Func<T, bool>>? predicate = null,
        Expression<Func<T, object>>? orderBy = null,
        bool? ascending = true);
 
}