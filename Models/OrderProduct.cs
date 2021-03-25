using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace E_Commerce_Test_API.Models
{
    public class OrderProduct
    {
        public int OrderProductID { get; set; }
        public Order Order { get; set; }
        public Product Product { get; set; }
    }
}
