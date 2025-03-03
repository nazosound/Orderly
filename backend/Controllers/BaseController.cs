using System.Security.Claims;
using backend.Errors;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class BaseController : ControllerBase
{
    protected int? UserId =>
        User.Identity?.IsAuthenticated ?? false ? int.Parse(HttpContext.User?.Identity?.Name!) : null;
    protected int? UserEntityId =>
     User.Identity?.IsAuthenticated ?? false
         ? int.Parse((HttpContext.User?.Claims.FirstOrDefault(w => w.Type == ClaimTypes.NameIdentifier)!.Value!))
         : null;
    protected string? UserRole =>
        User.Identity?.IsAuthenticated ?? false
            ? (HttpContext.User?.Claims.FirstOrDefault(w => w.Type == ClaimTypes.Role)?.Value)
            : "";
}