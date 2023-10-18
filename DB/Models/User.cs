using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StepRegistration.Models
{
    public class User 
    {
        [Key]
        [PersonalData]
        public Guid Id { get; set; }
        public DateTime RegisteredAtUtc { get; set; }

        [ProtectedPersonalData]
        public virtual string Login { get; set; }

        [ForeignKey("Contry")]
        [PersonalData]
        public virtual Guid CountryId { get; set; }

        [ForeignKey("Province")]
        [PersonalData]
        public virtual Guid ProvinceId { get; set; }

        public virtual string PasswordHash { get; set; }
        public virtual bool HasAgreedToPersonalDataProcessing { get; set; }
        public virtual byte[] PasswordSalt { get; set; }

        public User()
        {
            Id = Guid.NewGuid();
            RegisteredAtUtc = DateTime.UtcNow;
            PasswordHash = string.Empty;
            PasswordSalt = Array.Empty<byte>();
            Login = string.Empty;
        }
    }
}

