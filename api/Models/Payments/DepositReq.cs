namespace api.Models.Payments
{
    public class DepositReq
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string PayerId { get; set; }
    }
}