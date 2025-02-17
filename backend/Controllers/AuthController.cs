using System.Security.Claims;
using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(AuthService authService) : BaseController
{
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO loginRequest)
    {
        if (loginRequest.Email == null || loginRequest.Password == null)
            return Unauthorized(new { message = "Orderly : Invalid data" });

        var authResponse = await authService.Authenticate(loginRequest.Email, loginRequest.Password);
        if (authResponse == null) return Unauthorized(new { message = "Orderly : Unauthorized" });

        return Ok(authResponse);
    }
    
    [HttpPost]
    [Route("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
    {
        var response = await authService.RefreshToken(request.RefreshToken);
        if (response == null)
            return Unauthorized(new { message = "Invalid refresh token" });

        return Ok(response);
    }

    [Authorize]
    [HttpPost]
    [Route("logout")]
    public async Task<IActionResult> Logout()
    {
        var userId = UserId;
        if (userId == null)
            return BadRequest("User not found");

        await authService.Logout(userId.Value);
        return Ok(new { message = "Logged out successfully" });
    }
}