using System;
using System.Text.Json.Serialization;
using System.Collections.Generic;

namespace WebApi.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }

        [JsonIgnore]
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
        public int Balance { get; set; }
        public string ProfilePictureUrl { get; set; }
        public List<Ticket> Tickets { get; set; }
        public List<TicketMessage> TicketMessages { get; set; }
        public List<SlotMachineSpin> SlotMachineSpins { get; set; }
    }
}