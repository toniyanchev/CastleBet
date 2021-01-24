using System;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using WebApi.Entities;

namespace WebApi.Entities
{
    public class Ticket
    {
        public int Id { get; set; }
        public DateTime OriginDate { get; set; }
        public User User { get; set; }
        public string Title { get; set; }
        public List<TicketMessage> Messages { get; set; }
        public DateTime LastActionDate { get; set; }
        public string Status { get; set; }
    }
}