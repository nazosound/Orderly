using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Category
{
    public int Id { get; set; }
    public int? IdEntity { get; set; }
    public string CategoryName { get; set; } = null!;
    public bool? CategoryStatus { get; set; }
    public virtual Entity? IdEntityNavigation { get; set; }
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
