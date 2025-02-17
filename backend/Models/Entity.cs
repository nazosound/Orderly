using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models;

public partial class Entity
{
    public int Id { get; set; }
    public string? EntityName { get; set; }
    public bool? EntityStatus { get; set; }
    public DateTime? CreatedDate { get; set; }
    [JsonIgnore]
    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
    public virtual ICollection<Parameter> Parameters { get; set; } = new List<Parameter>();
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();
    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
