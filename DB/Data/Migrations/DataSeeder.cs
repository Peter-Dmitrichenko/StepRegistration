using Microsoft.EntityFrameworkCore;
using System.Dynamic;
using StepRegistration.Models;

namespace StepRegistration.Data.Migrations
{
    public class DataSeeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            // context.Database.EnsureCreated() does not use migrations to create the database and therefore the database that is created cannot be later updated using migrations 
            // use context.Database.Migrate() instead
            context.Database.Migrate();

            if (context.Countries.Any())
            {
                return;
            }

            // get dummy data
            var countries = GetDummyCountryList();

            context.AddRange(countries);

            var provinceList = countries
                .Select(e => e.Provinces
                    .Select(r =>
                    {
                        r.CountryId = e.Id;
                        return r;
                    }))
                    .SelectMany(e => e.Select(r => r))
                    .ToList();

            context.AddRange(provinceList);
            context.SaveChanges();
        }


        public static List<Country> GetDummyCountryList()
        {
            return new List<Country> {
                new Country{Name="Armenia", Provinces=new List<Province>{ new Province {Name="Karabakh" },new Province {Name = "Ararat" } } },
                new Country{Name="Azerbaijan", Provinces=new List<Province>{ new Province {Name="Fuzuli" },new Province {Name = "Barda" } } },
                new Country{Name="Turkey", Provinces=new List<Province>{ new Province {Name="Antalia" },new Province {Name = "Mugla" } } },
        };
        }
    }

}
