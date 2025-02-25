using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class AuthService(OrderlyContext context, TokenJwtService tokenJwtService)
{
    public async Task<AuthResponse?> Authenticate(string email, string password)
    {
        var userInfo = await context.Users
            .Include(user => user.IdEntityNavigation)
            .FirstOrDefaultAsync(w => w.Email == email);

        if (userInfo == null ||
            userInfo.UserPassword != password ||
            userInfo.UserStatus == false ||
            userInfo.IdEntityNavigation?.EntityStatus == false) return null;

        var accessToken = tokenJwtService.GenerateAccessToken(userInfo);
        var refreshToken = tokenJwtService.GenerateRefreshToken();

        userInfo.RefreshToken = refreshToken;
        userInfo.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
        await context.SaveChangesAsync();
      

        return new AuthResponse(
            new User
            {
                Id = userInfo.Id,
                Email = userInfo.Email,
                UserName = userInfo.UserName,
                UserStatus = userInfo.UserStatus,
                UserRole = userInfo.UserRole
            }, accessToken, refreshToken);
    }

    public async Task<AuthResponse?> RefreshToken(string refreshToken)
    {
        var user = await context.Users.FirstOrDefaultAsync(u =>
            u.RefreshToken == refreshToken && u.RefreshTokenExpiry > DateTime.UtcNow);
        if (user == null) return null;

        var newAccessToken = tokenJwtService.GenerateAccessToken(user);
        var newRefreshToken = tokenJwtService.GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
        await context.SaveChangesAsync();

        return new AuthResponse(null, newAccessToken, newRefreshToken);
    }

    public async Task Logout(int userId)
    {
        var user = await context.Users.FindAsync(userId);
        if (user != null)
        {
            user.RefreshToken = null;
            user.RefreshTokenExpiry = null;
            await context.SaveChangesAsync();
        }
    }
}