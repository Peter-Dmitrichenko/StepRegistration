using Microsoft.EntityFrameworkCore;
using StepRegistration.Data;
using StepRegistration.DTO;

namespace StepRegistration.Services
{
    public class CountryService : ICountryService
    {
        private readonly IApplicationDbContext context;

        public CountryService(IApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<CountryDTO>> GetCountriesWithProvincesDTO()
        {
            return await context.Countries
                .Include(e => e.Provinces)
                .Select(e => new CountryDTO
                {
                    Id = e.Id,
                    Name = e.Name,
                    Provinces = e.Provinces
                    .Select(r => new ProvinceDTO
                    {
                        Id = r.Id,
                        Name = r.Name
                    })
                    .ToList(),
                }
                ).ToListAsync();
        }
    }
}
