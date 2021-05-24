namespace api.Models.Payments
{
    public class AccesTokenReq
    {
        public string grant_type { get; set; }

        public AccesTokenReq(string type)
        {
            grant_type = type;
        }
    }
}