using System.Net;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Entities;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterRequest model)
        {
            var response = _userService.Register(model);

            if (response == null)
                return BadRequest(new { message = "Not valid data" });

            return Ok(response);
        }

        [HttpPost("upload-image")]
        public IActionResult UploadImage ([FromForm] UserImage model)
        {
            var response = _userService.UploadImage(model);

            if (!response)
                return BadRequest(new { message = "Error" });

            return Ok(response);
        }

        [HttpPost("get-picture")]
        public IActionResult GetImage (GetPicturePathReq model)
        {
            var response = _userService.GetPicturePath(model);

            if (response == null)
                return BadRequest(new { message = "User not exist!" });

            return Ok(response);
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }
    }
}
