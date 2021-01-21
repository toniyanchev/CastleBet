using System;
using System.Text.Json.Serialization;

namespace WebApi.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }

        [JsonIgnore]
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
    }
}