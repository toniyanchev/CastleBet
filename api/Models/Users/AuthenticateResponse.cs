using WebApi.Entities;

namespace WebApi.Models
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int Balance { get; set; }
        public string UserType { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(User user, string token)
        {
            Id = user.Id;
            Username = user.Username;
            Balance = user.Balance;
            UserType = user.IsAdmin ? "admin" : "client";
            Token = token;
        }
    }
}