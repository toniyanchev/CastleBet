namespace api.Models.Payments
{
    public class PaypalAmount
    {
        public string Currency_code { get; set; }
        public decimal Value { get; set; }

        public PaypalAmount(string currency, decimal value)
        {
            this.Currency_code = currency;
            this.Value = value;
        }
    }
}