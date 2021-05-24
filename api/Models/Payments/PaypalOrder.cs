using System.Collections.Generic;

namespace api.Models.Payments
{
    public class PaypalOrder
    {
        public string Intent { get; set; }
        public List<PaypalAmount> Purchase_units { get; set; }
        public PaypalPayer Payer { get; set; }

        public PaypalOrder(DepositReq model)
        {
            Intent = "CAPTURE";
            Purchase_units = new List<PaypalAmount> { new PaypalAmount(model.Currency, model.Amount) };
            Payer = new PaypalPayer { Payer_Id = model.PayerId };
        }
    }
}