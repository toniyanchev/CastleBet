using api.Models.Payments;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : ControllerBase
    {
        private IPaymentService _paymentsService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentsService = paymentService;
        }

        [HttpPost("deposit")]
        [Authorize]
        public IActionResult DepositFunds(DepositReq model)
        {
            var response = _paymentsService.DepositFunds(model);

            if (response == null)
                return BadRequest(new { message = "User do not exist or not enough balance" });

            return Ok(response);
        }

    }
}