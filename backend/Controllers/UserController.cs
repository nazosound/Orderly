using backend.Errors;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(UserService userService) : BaseController
{
    [HttpGet]
    [Authorize(Roles = $"{CONSTANTS.ADMIN}")]
    [Route("getUsers")]
    public async Task<IActionResult> GetUsers()
    {
        return End(await userService.GetAllUsers(UserId!.Value));
    }

    [HttpPost]
    [Authorize(Roles = $"{CONSTANTS.ADMIN}")]
    [Route("addUser")]
    public async Task<IActionResult> AddUser([FromBody] User? user)
    {
        if (user == null) return BadRequest();
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var resultAddUser = await userService.CreateUser(user);
        return End(resultAddUser);
    }

    [HttpPost]
    [Authorize(Roles = $"{CONSTANTS.ADMIN},{CONSTANTS.USER}")]
    [Route("updateUser")]
    public async Task<IActionResult> UpdateUser([FromBody] User? user)
    {
        if (user == null) return BadRequest();
        if (user.Id != UserId && UserRole != CONSTANTS.ADMIN) return End(CONSTANTS.FORBID);
        if (!ModelState.IsValid) return End(CONSTANTS.BADREQUEST);
        return End(await userService.UpdateUser(user));
    }

    [HttpGet]
    [Authorize]
    [Route("getUser")]
    public async Task<IActionResult> GetUser()
    {
        return End(await userService.GetUserById(UserId!.Value));
    }
}