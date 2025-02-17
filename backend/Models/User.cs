using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class User
{
    public int Id { get; set; }
    public int? IdEntity { get; set; }
    public string? Email { get; set; }
    public string UserPassword { get; set; } = null!;
    public string UserName { get; set; } = null!;
    public string UserRole { get; set; } = null!;
    public bool? UserStatus { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiry { get; set; }
    public DateTime? CreatedDate { get; set; }
    public virtual Entity? IdEntityNavigation { get; set; }
    public virtual ICollection<Logging> Loggings { get; set; } = new List<Logging>();
    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();
}
