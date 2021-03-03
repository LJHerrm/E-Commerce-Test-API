using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_Commerce_Test_API.Models;

namespace E_Commerce_Test_API.Data
{
    public class DBInitializer
    {
        public static void Initialize(StoreContext context)
        {
            context.Database.EnsureCreated();

            // Look for any Users.
            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            var users = new User[]
            {
            new User{UserID=1,Name="RootAdmin",Role=3,CreatedAt=DateTime.Parse("2005-09-01")},
            new User{UserID=2,Name="Alonso",Role=1,CreatedAt=DateTime.Parse("2002-09-01")},
            new User{UserID=3,Name="Anand",Role=1,CreatedAt=DateTime.Parse("2003-09-01")},
            new User{UserID=4,Name="Barzdukas",Role=1,CreatedAt=DateTime.Parse("2002-09-01")},
            new User{UserID=5,Name="Li",Role=1,CreatedAt=DateTime.Parse("2002-09-01")},
            new User{UserID=6,Name="Justice",Role=1,CreatedAt=DateTime.Parse("2001-09-01")},
            new User{UserID=7,Name="Norman",Role=1,CreatedAt=DateTime.Parse("2003-09-01")},
            new User{UserID=8,Name="Nino",Role=1,CreatedAt=DateTime.Parse("2005-09-01")}
            };
            foreach (User u in users)
            {
                context.Users.Add(u);
            }
            context.SaveChanges();

            var products = new Product[]
            {
            new Product{ProductID=1050,Name="Candle",Price=3.00m,CreatedAt=DateTime.Parse("2021-02-26")},
            new Product{ProductID=4022,Name="Book",Price=5.00m,CreatedAt=DateTime.Parse("2021-02-26")},
            new Product{ProductID=4041,Name="Marbles",Price=1.00m,CreatedAt=DateTime.Parse("2021-02-26")},
            new Product{ProductID=1045,Name="Apple",Price=1.00m,CreatedAt=DateTime.Parse("2021-02-26")},
            new Product{ProductID=3141,Name="TeaBag",Price=2.00m,CreatedAt=DateTime.Parse("2021-02-26")},
            new Product{ProductID=2021,Name="Cup",Price=2.50m,CreatedAt=DateTime.Parse("2021-02-26")},
            new Product{ProductID=2042,Name="Lamp",Price=8.00m,CreatedAt=DateTime.Parse("2021-02-26")}
            };
            foreach (Product p in products)
            {
                context.Products.Add(p);
            }
            context.SaveChanges();

            var orders = new Order[]
            {
            new Order{OrderID=1,TotalCost=15.00m,DeliveryAddress="123 Mulholland Drive",DeliveryPhone="123-456-7890",UserID=1},
            new Order{OrderID=2,TotalCost=18.00m,DeliveryAddress="123 Mulholland Drive",DeliveryPhone="123-456-7890",UserID=2},
            new Order{OrderID=3,TotalCost=21.00m,DeliveryAddress="123 Mulholland Drive",DeliveryPhone="123-456-7890",UserID=3},
            new Order{OrderID=4,TotalCost=17.00m,DeliveryAddress="123 Mulholland Drive",DeliveryPhone="123-456-7890",UserID=4},
            new Order{OrderID=5,TotalCost=13.00m,DeliveryAddress="123 Mulholland Drive",DeliveryPhone="123-456-7890",UserID=5},
            new Order{OrderID=6,TotalCost=5.00m,DeliveryAddress="123 Mulholland Drive",DeliveryPhone="123-456-7890",UserID=6},
            new Order{OrderID=7,TotalCost=22.00m,DeliveryAddress="123 Mulholland Drive",DeliveryPhone="123-456-7890",UserID=1},
            new Order{OrderID=8,TotalCost=8.00m,DeliveryAddress="123 Mulholland Drive",DeliveryPhone="123-456-7890",UserID=2},
            new Order{OrderID=9,TotalCost=16.00m,DeliveryAddress="123 Mulholland Drive",DeliveryPhone="123-456-7890",UserID=3},
            new Order{OrderID=10,TotalCost=12.00m,DeliveryAddress="123 Mulholland Drive",DeliveryPhone="123-456-7890",UserID=4},
            new Order{OrderID=11,TotalCost=9.00m,DeliveryAddress="123 Mulholland Drive",DeliveryPhone="123-456-7890",UserID=1},
            new Order{OrderID=12,TotalCost=10.00m,DeliveryAddress="123 Mulholland Drive",DeliveryPhone="123-456-7890",UserID=2},
            };
            foreach (Order o in orders)
            {
                context.Orders.Add(o);
            }
            context.SaveChanges();
        }
}
