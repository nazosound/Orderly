using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class UserService(IRepository<User> userRepository)
{
    public async Task<List<User>> GetAllUsers(int userId)
    {
        var user = await userRepository.GetByIdAsync(userId);
        if (user is null) return [];
        return await userRepository.GetWithConditionAsync(w => w.IdEntity == user.IdEntity,o => o.UserName);
    }

    public async Task<User?> GetUserById(int userId)
    {
        return await userRepository.GetByIdAsync(userId);
    }

    public async Task<User?> CreateUser(User user)
    { 
        return await userRepository.AddAsync(user);
    }
    
    public async Task<User?> UpdateUser(User user)
    { 
        return await userRepository.UpdateAsync(user);
    }
}