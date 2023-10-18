using StepRegistration.DTO;

namespace StepRegistration.Services
{
    public interface ICountryService
    {
        Task<IEnumerable<CountryDTO>> GetCountriesWithProvincesDTO();
    }
}