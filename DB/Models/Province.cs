using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace StepRegistration.Models
{
    public class Province
    {
        [Key]
        public Guid Id { get; set; }

        [ProtectedPersonalData]
        public virtual string Name { get; set; }

        [ForeignKey("Contry")]
        [PersonalData]
        public Guid CountryId { get; set; }                 

        public Province()
        {
            Id = Guid.NewGuid();
            Name = string.Empty;
        }
    }
}
