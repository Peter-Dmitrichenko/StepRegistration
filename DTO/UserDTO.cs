namespace StepRegistration.DTO
{
    public class UserDTO 
    {
        public UserDTO(string login, string password, bool hasAgreedToPersonalDataProcessing, Guid countryId, Guid provinceId)
        {
            Login = login ?? throw new ArgumentNullException(nameof(login));
            Password = password ?? throw new ArgumentNullException(nameof(password));
            HasAgreedToPersonalDataProcessing = hasAgreedToPersonalDataProcessing;
            CountryId = countryId;
            ProvinceId = provinceId;
        }

        public string Login { get; set; }
        public string Password { get; set; }
        public bool HasAgreedToPersonalDataProcessing { get; set; }
        public Guid CountryId { get; set; }
        public Guid ProvinceId { get; set; }
    }
}
