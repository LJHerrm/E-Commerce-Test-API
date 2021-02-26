using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_Commerce_Test_API.Models
{
    public class Order
    {
        public int OrderID { get; set; }
        public decimal TotalCost { get; set; }
        public string DeliveryAddress { get; set; }
        public string DeliveryPhone { get; set; }
        public int UserID { get; set; }
        public ICollection<Product> ProductID { get; set; }
        public User User { get; set; }
    }
}
