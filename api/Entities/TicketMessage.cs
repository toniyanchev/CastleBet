using System;
using System.Text.Json.Serialization;

namespace WebApi.Entities
{
    public class TicketMessage
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }
        public User User { get; set; }
        public Ticket Ticket { get; set; }
    }
}