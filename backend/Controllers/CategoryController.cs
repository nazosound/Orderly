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
        [Authorize(Roles = $"{CONSTANTS.ADMIN},{CONSTANTS.SALES}")]
        [Route("getCategories")]
        public async Task<IActionResult> GetCategories(bool onlyActive = false)
        {
            if (onlyActive == false && UserRole == CONSTANTS.SALES)
            {
                return Forbid();
            }
            return Ok(await categoryService.GetCategories(onlyActive));
        }

        [HttpPost]
        [Authorize(Roles = $"{CONSTANTS.ADMIN}")]
        [Route("addCategory")]
        public async Task<IActionResult> AddCategory([FromBody] Category? category)
        {
            if (category is null) return BadRequest();

            category.IdEntity = UserEntityId;

            if (category.Id > 0)
            {
                var resultUpdateCategory = await categoryService.UpdateCategory(category);
                return resultUpdateCategory is not null ? Ok(resultUpdateCategory) : BadRequest();
            }

            var resultCreateCategory = await categoryService.CreateCategory(category);
            return resultCreateCategory is not null ? Ok(resultCreateCategory) : BadRequest();
        }

        [HttpPost]
        [Authorize(Roles = $"{CONSTANTS.ADMIN}")]
        [Route("updateCategory")]
        public async Task<IActionResult> UpdateCategory([FromBody] Category? category)
        {
            if (category is null) return BadRequest();
            var resultCreateCategory = await categoryService.UpdateCategory(category);
            return resultCreateCategory is not null ? Ok(resultCreateCategory) : BadRequest();
        }
    }
}
