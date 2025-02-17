using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Sale
{
    public int Id { get; set; }
    public int? IdEntity { get; set; }
    public int? IdAccount { get; set; }
    public int? IdUser { get; set; }
    public decimal TotalSale { get; set; }
    public int TotalItems { get; set; }
    public DateTime? CreatedDate { get; set; }
    public virtual Account? IdAccountNavigation { get; set; }
    public virtual Entity? IdEntityNavigation { get; set; }
    public virtual User? IdUserNavigation { get; set; }
    public virtual ICollection<Saledetail> Saledetails { get; set; } = new List<Saledetail>();
}
