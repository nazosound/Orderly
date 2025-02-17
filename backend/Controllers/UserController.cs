using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(UserService userService) : BaseController
{
    [HttpGet]
    [Authorize]
    [Route("getUsers")]
    public async Task<IActionResult> GetUsers()
    {
        return Ok(await userService.GetAllUsers());
    }
}