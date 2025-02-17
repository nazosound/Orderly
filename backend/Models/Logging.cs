using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Logging
{
    public int Id { get; set; }
    public int? IdUser { get; set; }
    public string? Message { get; set; }
    public DateTime? CreatedDate { get; set; }
    public virtual User? IdUserNavigation { get; set; }
}
