using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_Commerce_Test_API.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public int Role { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
