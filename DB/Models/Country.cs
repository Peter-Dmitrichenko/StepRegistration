using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StepRegistration.Models
{
    public class Country
    {
        [Key]
        public Guid Id { get; set; }

        public virtual string Name { get; set; }

        public Country()
        {
            Id = Guid.NewGuid();
            Name = string.Empty;
        }

        [ForeignKey("CountryId")]
        public virtual IList<Province> Provinces { get; set; }
    }
}
