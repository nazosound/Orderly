using System.Security.Claims;
using backend.DTOs;
using backend.Errors;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

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

    protected IActionResult End(bool result, string message, object data, int statuscode = CONSTANTS.OK)
        => Ok(new ApiResponse(result, message, data, statuscode));

    protected IActionResult End(bool result, string message, int statuscode)
    => Ok(new ApiResponse(result, message, null, statuscode));

    protected IActionResult End(int statuscode)
    {
        int[] errorCodes = [CONSTANTS.NOTFOUND, CONSTANTS.BADREQUEST, CONSTANTS.FORBID, CONSTANTS.INTERNALERROR];
        if (errorCodes.Contains(statuscode))
        {
            return End(false, CONSTANTS.ERROR, statuscode);
        }

        return End(true, CONSTANTS.SUCCESS, statuscode);
    }

    protected IActionResult End(object? data)
    {
        if (data is not null)
        {
            return End(true, CONSTANTS.SUCCESS, data, CONSTANTS.OK);
        }

        return End(CONSTANTS.BADREQUEST);
    }

    protected IActionResult End() => End(CONSTANTS.OK);

}