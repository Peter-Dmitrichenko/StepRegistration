namespace StepRegistration.DTO
{
    public class CountryDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public IList<ProvinceDTO> Provinces { get; set; }
    }
}
