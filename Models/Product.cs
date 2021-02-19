using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_Commerce_Test_API.Models
{
    public class Product
    {
        public int ProductID { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
