using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class UserService(OrderlyContext context)
{
    public async Task<List<User>> GetAllUsers()
    {
        return await context.Users.ToListAsync();
    }
}