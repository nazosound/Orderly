using backend.DTOs;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class CategoryService(IRepository<Category> categoryRepository)
    {
        public async Task<PaginatedList<List<Category>>> GetAllCategories(int page, string search)
        {
            return await categoryRepository
                .GetListPaginatedAsync(page, CONSTANTS.PAGESIZE,
                    orderBy: o => o.CategoryName,
                    predicate: (w => w.CategoryName.ToLower().Contains(search.ToLower()) ));
        }

        public async Task<List<Category>> GetActiveCategories()
        {
            return await categoryRepository.GetWithConditionAsync(w => w.CategoryStatus == true, o => o.CategoryName);
        }

        public async Task<Category?> CreateCategory(Category category)
        {
            return await categoryRepository.AddAsync(category);
        }

        public async Task<Category?> UpdateCategory(Category category)
        {
            return await categoryRepository.UpdateAsync(category);
        }
    }
}