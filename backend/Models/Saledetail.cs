using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Saledetail
{
    public int Id { get; set; }
    public int? IdSale { get; set; }
    public int? IdProduct { get; set; }
    public decimal ProductSellUnit { get; set; }
    public decimal ProductSellTotal { get; set; }
    public int ProductQuantity { get; set; }
    public virtual Product? IdProductNavigation { get; set; }
    public virtual Sale? IdSaleNavigation { get; set; }
}
