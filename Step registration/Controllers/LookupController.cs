using Microsoft.AspNetCore.Mvc;
using StepRegistration.DTO;
using StepRegistration.Services;

namespace StepRegistration.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class LookupController : ControllerBase
    {
        private readonly ICountryService countryService;

        public LookupController(ICountryService countryService)
        {
            this.countryService = countryService;
        }

        [HttpGet]
        public async Task<IEnumerable<CountryDTO>> GetCountriesWithProvinces()
        {
            return await countryService.GetCountriesWithProvincesDTO();
        }
    }
}