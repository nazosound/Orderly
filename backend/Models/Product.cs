using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Product
{
    public int Id { get; set; }
    public int? IdEntity { get; set; }
    public int? IdCategory { get; set; }
    public string ProductName { get; set; } = null!;
    public string? ProductImageUrl { get; set; }
    public decimal? ProductCost { get; set; }
    public decimal ProductSell { get; set; }
    public int? ProductQuantity { get; set; }
    public bool? ProductStatus { get; set; }
    public string? ProductCurrency { get; set; }
    public string? BarCode { get; set; }
    public DateTime? CreatedDate { get; set; }
    public virtual Category? IdCategoryNavigation { get; set; }
    public virtual Entity? IdEntityNavigation { get; set; }
    public virtual ICollection<Saledetail> Saledetails { get; set; } = new List<Saledetail>();
}
