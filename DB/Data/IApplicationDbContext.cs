using Microsoft.EntityFrameworkCore;
using StepRegistration.Models;

namespace StepRegistration.Data
{
    public interface IApplicationDbContext
    {
        DbSet<Country> Countries { get; set; }
        DbSet<Province> Provinces { get; set; }
        DbSet<User> Users { get; set; }

        Task<int> SaveChangesAsync();
    }
}