using System.Net;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Entities;
using WebApi.Services;
using WebApi.Models.Tickets;

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

        [HttpPost("get")]
        public IActionResult GetByUser(GetTicketsReq model)
        {
            var response = _ticketService.GetByUser(model.UserId);

            if (response == null)
                return BadRequest(new { message = "User do not exist" });

            return Ok(response);
        }

        [HttpGet("get-for-admin")]
        public IActionResult GetForAdmin()
        {
            var response = _ticketService.GetAdminTickets();

            if (response == null)
                return BadRequest(new { message = "error fetching" });

            return Ok(response);
        }

        [HttpPost("create")]
        [Authorize]
        public IActionResult AddTicket(CreateTicketReq ticket)
        {
            var response = _ticketService.AddTicket(ticket);

            if (response == null)
                return BadRequest(new { message = "User do not exist or it is admin" });

            return Ok(response);
        }

        [HttpPost("get-messages")]
        [Authorize]
        public IActionResult GetTicketMessages(TicketMessagesReq model)
        {
            var response = _ticketService.GetTicketMessages(model);

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
