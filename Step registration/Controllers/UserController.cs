using Microsoft.AspNetCore.Mvc;
using StepRegistration.DTO;
using StepRegistration.Services;

namespace StepRegistration.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserService userService, ILogger<UserController> logger)
        {
            this.userService = userService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<StatusCodeResult> Register(UserDTO user)
        {
            try
            {
                await userService.Register(user);
            }
            catch (Exception e) {
                _logger.LogError("Unable to register new user", e);

                return new StatusCodeResult(500);
            }

            return new OkResult();
        }
    }
}
