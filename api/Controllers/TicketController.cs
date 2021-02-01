using System.Net;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Entities;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketController : ControllerBase
    {
        private ITicketService _ticketService;

        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpGet("get")]
        public IActionResult GetByUser(int userId)
        {
            var response = _ticketService.GetByUser(userId);

            if (response == null)
                return BadRequest(new { message = "User do not exist" });

            return Ok(response);
        }

        [HttpPost("create")]
        public IActionResult AddTicket(CreateTicketReq ticket)
        {
            var response = _ticketService.AddTicket(ticket);

            if (response == null)
                return BadRequest(new { message = "User do not exist" });

            return Ok(response);
        }

        [HttpPost("reply")]
        public IActionResult AddTicketMessage(AddTicketMessageReq model)
        {
            var response = _ticketService.AddTicketMessage(model);

            if (response == null)
                return BadRequest(new { message = "Wrong data to save." });

            return Ok(response);
        }

        [HttpPost("close")]
        public IActionResult CloseTicket(CloseTicketReq model)
        {
            var response = _ticketService.CloseTicket(model);

            if (response == null)
                return BadRequest(new { message = "User is not admin or does not exist" });

            return Ok(response);
        }
    }
}
