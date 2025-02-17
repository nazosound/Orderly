using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Parameter
{
    public int Id { get; set; }
    public int? IdEntity { get; set; }
    public string Parameter1 { get; set; } = null!;
    public string Value { get; set; } = null!;
    public virtual Entity? IdEntityNavigation { get; set; }
}
