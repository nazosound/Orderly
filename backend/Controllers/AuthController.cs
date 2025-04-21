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
            return Ok(new { result = false, message = "Orderly : Invalid credentials" });

        var authResponse = await authService.Authenticate(loginRequest.Email, loginRequest.Password);
        if (authResponse == null) return End(CONSTANTS.FORBID);

        Response.Cookies.Append("refreshtoken", authResponse.RefreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddDays(7)
        });
        authResponse.RefreshToken = "";
        return End(authResponse);
    }

    [HttpPost]
    [Route("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var refreshToken = Request.Cookies["refreshtoken"];
        if (refreshToken == null) return Forbid();

        var authResponse = await authService.RefreshToken(refreshToken);
        if (authResponse == null)
            return Forbid();

        Response.Cookies.Append("refreshtoken", authResponse.RefreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddDays(7)
        });
        authResponse.RefreshToken = "";

        return End(authResponse);
    }

    [Authorize]
    [HttpPost]
    [Route("logout")]
    public async Task<IActionResult> Logout()
    {
        var userId = UserId;
        if (userId == null)
            return End(CONSTANTS.NOTFOUND);

        await authService.Logout(userId.Value);
        return End();
    }

    [Authorize]
    [HttpGet]
    [Route("HasAccess")]
    public IActionResult HasAccess([FromQuery] string[] roles)
    {
        if (roles.Length == 0) return End(CONSTANTS.FORBID);
        if (roles.Select(s => s.ToLower()).Contains(UserRole?.ToLower()))
        {
            return End(true, CONSTANTS.SUCCESS, 200);
        }

        return End(CONSTANTS.FORBID);
    }
}