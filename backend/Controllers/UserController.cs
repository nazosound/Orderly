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
        return Ok(await userService.GetAllUsers(UserId!.Value));
    }

    [HttpPost]
    [Authorize(Roles = $"{CONSTANTS.ADMIN}")]
    [Route("addUser")]
    public async Task<IActionResult> AddUser([FromBody] User? user)
    {
        if (user == null) return BadRequest();
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var resultAddUser = await userService.CreateUser(user);
        return resultAddUser is not null ? Ok(resultAddUser) : BadRequest();
    }

    [HttpPost]
    [Authorize(Roles = $"{CONSTANTS.ADMIN},{CONSTANTS.USER}")]
    [Route("updateUser")]
    public async Task<IActionResult> UpdateUser([FromBody] User? user)
    {
        if (user == null) return BadRequest();
        if (user.Id != UserId && UserRole != "ADMINISTRADOR") return Forbid();
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var resultUpdateUser = await userService.UpdateUser(user);
        return resultUpdateUser is not null ? Ok(resultUpdateUser) : BadRequest();
    }

    [HttpGet]
    [Authorize]
    [Route("getUser")]
    public async Task<IActionResult> GetUser()
    {
        var user = await userService.GetUserById(UserId!.Value);
        return user is not null ? Ok(user) : BadRequest();
    }
}