using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController(CategoryService categoryService) : BaseController
    {
        [HttpGet]
        [Authorize(Roles = $"{CONSTANTS.ADMIN}")]
        [Route("getAllCategories")]
        public async Task<IActionResult> GetAllCategories(int page = 1,string search = "")
        {
            var result = await categoryService.GetAllCategories(page,search);
            return End(true, "", result);
        }

        [HttpGet]
        [Authorize(Roles = $"{CONSTANTS.ADMIN}{CONSTANTS.SALES}")]
        [Route("getCategories")]
        public async Task<IActionResult> GetCategories()
        {
            return End(true, "", await categoryService.GetActiveCategories());
        }

        [HttpPost]
        [Authorize(Roles = $"{CONSTANTS.ADMIN}")]
        [Route("addCategory")]
        public async Task<IActionResult> AddCategory([FromBody] Category? category)
        {
            if (category is null) return End(CONSTANTS.BADREQUEST);
            category.IdEntity = UserEntityId;
            if (category.Id > 0)
            {
                return End(await categoryService.UpdateCategory(category));
            }
            return End(await categoryService.CreateCategory(category));
        }

        [HttpPost]
        [Authorize(Roles = $"{CONSTANTS.ADMIN}")]
        [Route("updateCategory")]
        public async Task<IActionResult> UpdateCategory([FromBody] Category? category)
        {
            if (category is null) return End(CONSTANTS.BADREQUEST);
            var resultCreateCategory = await categoryService.UpdateCategory(category);
            return End(resultCreateCategory);
        }
    }
}
