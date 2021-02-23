using System.Net;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Entities;
using WebApi.Services;
using WebApi.Models.SlotMachine;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SlotMachineController : ControllerBase
    {
        private ISlotMachineService _slotMachineService;

        public SlotMachineController(ISlotMachineService slotMachineService)
        {
            _slotMachineService = slotMachineService;
        }

        [HttpPost("spin")]
        [Authorize]
        public IActionResult Spin(SlotMachineSpinReq model)
        {
            var response = _slotMachineService.Spin(model);

            if (response == null)
                return BadRequest(new { message = "User do not exist or not enough balance" });

            return Ok(response);
        }

    }
}
