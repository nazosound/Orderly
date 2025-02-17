using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Account
{
    public int Id { get; set; }
    public int? IdEntity { get; set; }
    public string AccountName { get; set; } = null!;
    public string? AccountDescription { get; set; }
    public bool? AccountStatus { get; set; }
    public DateTime? CreatedDate { get; set; }
    public virtual Entity? IdEntityNavigation { get; set; }
    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();
}
