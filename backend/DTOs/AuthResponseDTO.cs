using backend.Models;

namespace backend.DTOs;

public class AuthResponse
{
    public AuthResponse(User? user, string token, string refreshToken)
    {
        Token = token;
        User = user;
        RefreshToken = refreshToken;
    }

   

    public string Token { get; set; }
    public User? User { get; set; }
    public string RefreshToken { get; set; }
}