using backend.Interfaces;
using backend.Models;

namespace backend.Services
{
    public class CategoryService(IRepository<Category> categoryRepository)
    {
        public async Task<List<Category>> GetCategories(bool onlyActive = false)
        {
            if (onlyActive)
                return await categoryRepository.GetWithConditionAsync(w => w.CategoryStatus == true, o => o.CategoryName);
            else
                return (await categoryRepository.GetAllAsync()).OrderBy(o => o.CategoryName).ToList();
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
