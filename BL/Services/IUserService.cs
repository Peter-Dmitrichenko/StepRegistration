using StepRegistration.DTO;

namespace StepRegistration.Services
{
    public interface IUserService
    {
        Task Register(UserDTO user);
    }
}