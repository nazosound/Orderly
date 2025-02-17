using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class BaseController : ControllerBase
{
    protected int? UserId => User.Identity?.IsAuthenticated ?? false ? int.Parse(HttpContext.User?.Identity?.Name!) : null;
}