using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using StepRegistration.Data;
using StepRegistration.DTO;

namespace StepRegistration.Services
{
    public class UserService : IUserService
    {
        private readonly IApplicationDbContext context;

        public UserService(IApplicationDbContext context)
        {
            this.context = context;
        }


        private static byte[] GenerateSalt() => RandomNumberGenerator.GetBytes(128 / 8); // divide by 8 to convert bits to bytes

        private static string GenerateHash(string password, byte[] salt)
        {
            // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password!,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            return hashed;
        }

        public async Task Register(UserDTO user)
        {
            var salt = GenerateSalt();

            await context.Users.AddAsync(new Models.User()
            {
                CountryId = user.CountryId,
                PasswordHash = GenerateHash(user.Password,salt),
                PasswordSalt = salt,
                ProvinceId = user.ProvinceId,
                HasAgreedToPersonalDataProcessing = user.HasAgreedToPersonalDataProcessing,
                Login = user.Login
            });

            await context.SaveChangesAsync();
        }
    }
}
