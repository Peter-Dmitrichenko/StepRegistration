using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using TestBL.Extesions;
using StepRegistration.Controllers;
using StepRegistration.Data;
using StepRegistration.Data.Migrations;
using StepRegistration.DTO;
using StepRegistration.Models;
using StepRegistration.Services;

namespace TestBL
{
    public class Tests
    {
        public Mock<IApplicationDbContext> MockContext { get; private set; }

        public List<Country> Countries { get; private set; }
        public List<Province> Provinces { get; private set; }
        public List<User> Users { get; private set; }

        private static DbSet<T> GetQueryableMockDbSet<T>(List<T> sourceList) where T : class
        {
            var queryable = sourceList.AsQueryable();

            var dbSet = new Mock<DbSet<T>>();
            dbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
            dbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
            dbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
            dbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());
            dbSet.Setup(d => d.Add(It.IsAny<T>())).Callback<T>((s) => sourceList.Add(s));

            return dbSet.Object;
        }

        private static DbSet<T> GetAsyncQueryableMockDbSet<T>(IQueryable<T> sourceList) where T : class
        {
            var queryable = sourceList.AsQueryable();

            var dbSet = new Mock<DbSet<T>>();
            dbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
            dbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
            dbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
            dbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());

            return dbSet.Object;
        }

        [SetUp]
        public void Setup()
        {
            Countries = DataSeeder.GetDummyCountryList();

            Provinces = Countries
                .Select(e => e.Provinces
                    .Select(r =>
                    {
                        r.CountryId = e.Id;
                        return r;
                    }))
                    .SelectMany(e => e.Select(r => r))
                    .ToList();

            Users = new List<User>();

            MockContext = new Mock<IApplicationDbContext>();
            MockContext.Setup(mc => mc.Countries).Returns(GetAsyncQueryableMockDbSet(ICollectionExtensions.AsAsyncQueryable(Countries)));
            MockContext.Setup(mc => mc.Provinces).Returns(GetAsyncQueryableMockDbSet(ICollectionExtensions.AsAsyncQueryable(Provinces)));
            MockContext.Setup(mc => mc.Users).Returns(GetQueryableMockDbSet(Users));
        }

        [Test]
        public async Task Should_Get_GetCountriesWithProvincesDTO()
        {
            CountryService service = new CountryService(MockContext.Object);

            var countries = await service.GetCountriesWithProvincesDTO();

            Assert.IsTrue(countries.ToList().Count > 0);
        }

        [Test]
        public async Task Should_Register_User()
        {
            var service = new UserService(MockContext.Object);
            var user = new UserDTO("test@test.com", "ASD1", true, Countries.First().Id, Provinces.First().Id);

            await service.Register(user);
        }

        [Test]
        public async Task Should_Get_Countries_From_Controller()
        {
            var countryServiceMock = new Mock<ICountryService>();
            countryServiceMock.Setup(mc => mc.GetCountriesWithProvincesDTO()).ReturnsAsync((new List<CountryDTO>
            { new CountryDTO {
                Id=Guid.Empty,
                Name="Armenia",
                Provinces=new List<ProvinceDTO> {
                    new ProvinceDTO {
                        Id=Guid.Empty,
                        Name="Ararat"}
                }
            }
            }).AsEnumerable());

            var controller = new LookupController(countryServiceMock.Object);
            var countries = await controller.GetCountriesWithProvinces();

            Assert.IsTrue(countries.ToList().Count > 0);
        }   
        
        [Test]
        public async Task Should_Register_User_Controller()
        {
            var loggerMock = new Mock<ILogger<UserController>>();
            var userServiceMock = new Mock<IUserService>();
            userServiceMock.Setup(e => e.Register(It.IsAny<UserDTO>())).Returns(Task.FromResult(0));

            var controller = new UserController(userServiceMock.Object, loggerMock.Object);
            await controller.Register(new UserDTO("asd@asd.com","ASD1",true,Guid.Empty,Guid.Empty));

            Assert.Pass();
        }
    }
}